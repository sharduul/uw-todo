import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ElementRef} from '@angular/core';
import {Column} from './column';
import { Board } from '../board/board';
import {Card} from '../card/card';
import {CardComponent} from '../card/card.component'
import {ColumnService} from './column.service';
import {WebSocketService} from '../ws.service';
import {CardService} from '../card/card.service';
import {OrderBy} from '../pipes/orderby.pipe';
import {Where} from '../pipes/where.pipe';

declare var jQuery: any;

@Component({
  selector: 'gtm-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input()
  column: Column;
  @Input()
  board: Board;
  @Input()
  cards: Card[];
  @Output()
  public onAddCard: EventEmitter<Card>;
  @Output() cardUpdate: EventEmitter<Card>;

  editingColumn = false;
  addingCard = false;
  addCardText: string;
  currentTitle: string;
  isShowActions: boolean;

  constructor(private el: ElementRef,
    private _ws: WebSocketService,
    private _columnService: ColumnService,
    private _cardService: CardService) {
    this.onAddCard = new EventEmitter();
    this.cardUpdate = new EventEmitter();
  }

  ngOnInit() {
    this.setupView();
    this._ws.onColumnUpdate.subscribe((column: Column) => {
      if (this.column._id === column._id) {
        this.column.title = column.title;
        this.column.order = column.order;
      }
    });
  }

  setupView() {
    let component = this;
    var startColumn;
    jQuery('.card-list').sortable({
      connectWith: ".card-list",
      placeholder: "card-placeholder",
      dropOnEmpty: true,
      tolerance: 'pointer',
      start: function(event, ui) {
        ui.placeholder.height(ui.item.outerHeight());
        startColumn = ui.item.parent();
      },
      stop: function(event, ui) {
        var senderColumnId = startColumn.attr('column-id');
        var targetColumnId = ui.item.closest('.card-list').attr('column-id');
        var cardId = ui.item.find('.card').attr('card-id');

        component.updateCardsOrder({
          columnId: targetColumnId || senderColumnId,
          cardId: cardId
        });
      }
    });
    jQuery('.card-list').disableSelection();
  }

  deleteColumn(event) {
    event.stopPropagation();
    this._columnService.delete(this.column).then(res => {
      console.log("column deleted");
      this._ws.deleteColumn(this.column);
    });
  }

  copyColumn(event) {
    event.stopPropagation();
    this.toggleActions();

    let newColumn = <Column>{
      title: this.column.title,
      order: (this.board.columns.length + 1) * 1000,
      boardId: this.board._id
    };

    this._columnService.post(newColumn)
      .subscribe(column => {
        console.log('column copied');
        this._ws.addColumn(this.board._id, column);
      });
  }

  sort(event, code){
    event.stopPropagation();
    this.toggleActions();

    var prop = "title";
    var sortFn = (a, b) => { 
      if (a[prop] < b[prop])
        return -1;
      if ( a[prop] > b[prop])
        return 1;
      return 0;
    }

    switch(code){
      case "start_date": 
        prop = "startDate";
        this.cards.sort(sortFn); 
        break;
      case "effort": 
        prop = "effort";
        this.cards.sort(sortFn); 
        break;
      case "title": 
        prop = "title";
        this.cards = this.cards.sort(sortFn); 
        break;
    }

    for(let i = 0; i < this.cards.length; i++){
      this.cards[i].order = (i+1) * 1000;
    }
  }

  updateCardsOrder(event) {
    let cardArr = jQuery('[column-id=' + event.columnId + '] .card'),
      i: number = 0,
      elBefore: number = -1,
      elAfter: number = -1,
      newOrder: number = 0;

    for (i = 0; i < cardArr.length - 1; i++) {
      if (cardArr[i].getAttribute('card-id') == event.cardId) {
        break;
      }
    }

    if (cardArr.length > 1) {
      if (i > 0 && i < cardArr.length - 1) {
        elBefore = +cardArr[i - 1].getAttribute('card-order');
        elAfter = +cardArr[i + 1].getAttribute('card-order');

        newOrder = elBefore + ((elAfter - elBefore) / 2);
      }
      else if (i == cardArr.length - 1) {
        elBefore = +cardArr[i - 1].getAttribute('card-order');
        newOrder = elBefore + 1000;
      } else if (i == 0) {
        elAfter = +cardArr[i + 1].getAttribute('card-order');

        newOrder = elAfter / 2;
      }
    } else {
      newOrder = 1000;
    }


    let card = this.cards.filter(x => x._id === event.cardId)[0];
    let oldColumnId = card.columnId;
    card.order = newOrder;
    card.columnId = event.columnId;
    this._cardService.put(card).then(res => {
      this._ws.updateCard(this.column.boardId, card);
    });
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.updateColumn();
    } else if (event.keyCode === 27) {
      this.cleadAddColumn();
    }
  }

  cardCopy(newCard: Card) {
    newCard.order = (this.cards.length + 1) * 1000;
    this._cardService.post(newCard)
      .subscribe(card => {
        this.onAddCard.emit(card);
        this._ws.addCard(card.boardId, card);
      });
  }

  addCard() {
    this.cards = this.cards || [];
    let newCard = <Card>{
      title: this.addCardText,
      order: (this.cards.length + 1) * 1000,
      columnId: this.column._id,
      boardId: this.column.boardId
    };
    this._cardService.post(newCard)
      .subscribe(card => {
        this.onAddCard.emit(card);
        this._ws.addCard(card.boardId, card);
      });
  }

  addCardOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
        this.addCardText = '';
      } else {
        this.clearAddCard();
      }
    } else if (event.keyCode === 27) {
      this.clearAddCard();
    }
  }

  updateColumn() {
    if (this.column.title && this.column.title.trim() !== '') {
      this._columnService.put(this.column).then(res => {
        this._ws.updateColumn(this.column.boardId, this.column);
      });
      this.editingColumn = false;
    } else {
      this.cleadAddColumn();
    }
  }

  cleadAddColumn() {
    this.column.title = this.currentTitle;
    this.editingColumn = false;
  }

  editColumn() {
    this.currentTitle = this.column.title;
    this.editingColumn = true;
    let input = this.el.nativeElement
      .getElementsByClassName('column-header')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function() { input.focus(); }, 0);
  }

  enableAddCard() {
    this.addingCard = true;
    let input = this.el.nativeElement
      .getElementsByClassName('add-card')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function() { input.focus(); }, 0);
  }


  updateColumnOnBlur() {
    if (this.editingColumn) {
      this.updateColumn();
      this.clearAddCard();
    }
  }


  addCardOnBlur() {
    if (this.addingCard) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
      }
    }
    this.clearAddCard();
  }

  clearAddCard() {
    this.addingCard = false;
    this.addCardText = '';
  }

  onCardUpdate(card: Card){
    this.cardUpdate.emit(card);
  }

  toggleActions(){
    this.isShowActions = !this.isShowActions;
  }
}