import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, NgZone} from '@angular/core';
import {Card} from './card';
import {Column} from '../column/column';
import {CardService} from './card.service';
import {WebSocketService} from '../ws.service';

@Component({
  selector: 'gtm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Output() cardUpdate: EventEmitter<Card>;
  @Output() public onCardCopy: EventEmitter<Card>;

  editingCard = false;
  editingCardDetails = false;
  currentTitle: string;
  zone: NgZone;
  constructor(private el: ElementRef,
    private _ref: ChangeDetectorRef,
    private _ws: WebSocketService,
    private _cardService: CardService) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.cardUpdate = new EventEmitter();
    this.onCardCopy = new EventEmitter();
  }

  ngOnInit() {
    this._ws.onCardUpdate.subscribe((card: Card) => {
      if (this.card._id === card._id) {
        this.card.title = card.title;
        this.card.order = card.order;
        this.card.columnId = card.columnId;
      }
    });
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    } else if (event.keyCode === 27) {
      this.card.title = this.currentTitle;
      this.editingCard = false;
    }
  }

  editCard() {
    this.editingCard = true;
    this.currentTitle = this.card.title;

    let textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];

    setTimeout(function() {
      textArea.focus();
    }, 0);
  }

  deleteCard(event) {
    event.stopPropagation();
    this._cardService.delete(this.card).then(res => {
      console.log("card deleted");
      this._ws.deleteCard(this.card);
    });
  }

  copy(event){
    event.stopPropagation();

    let newCard = <Card>{
      title: this.card.title,
      description: this.card.description,
      boardId: this.card.boardId,
      columnId: this.card.columnId,
      effort: this.card.effort,
      startDate: this.card.startDate,
      endDate: this.card.endDate
    };

    this.onCardCopy.emit(newCard);

  }


  markDone(event) {
    this.card.isDone = !this.card.isDone;
    this.updateCard();
  }

  editCardDetails(event) {
    event.stopPropagation();
    this.editingCardDetails = !this.editingCardDetails;
  }

  updateCard() {
    if (!this.card.title || this.card.title.trim() === '') {
      this.card.title = this.currentTitle;
    }

    this._cardService.put(this.card).then(res => {
      this._ws.updateCard(this.card.boardId, this.card);
    });

    this.editingCard = false;
  }

  //TODO: check lifecycle
  private ngOnDestroy() {
    //this._ws.onCardUpdate.unsubscribe();
  }

}