import {Injectable, EventEmitter} from '@angular/core';
import {Board} from './board/board';
import {Column} from './column/column';
import {Card} from './card/card';
import { ROOT_URL } from './constants'

declare var io;

@Injectable()
export class WebSocketService {
  socket: any;
  public onColumnAdd: EventEmitter<Column>;
  public onCardAdd: EventEmitter<Card>;
  public onColumnUpdate: EventEmitter<Column>;
  public onColumnDelete: EventEmitter<Column>;
  public onCardUpdate: EventEmitter<Card>;
  public onCardDelete: EventEmitter<Card>;

  constructor() {
    this.onColumnAdd = new EventEmitter();
    this.onCardAdd = new EventEmitter();
    this.onColumnUpdate = new EventEmitter();
    this.onColumnDelete = new EventEmitter();
    this.onCardUpdate = new EventEmitter();
    this.onCardDelete = new EventEmitter();
  }

  connect(){
    this.socket = io(ROOT_URL);

    this.socket.on('addColumn', data => {
      this.onColumnAdd.emit(<Column>data.column);
    });
    this.socket.on('addCard', data => {
      this.onCardAdd.emit(<Card>data.card);
    });
    this.socket.on('updateColumn', data => {
      this.onColumnUpdate.emit(<Column>data.column);
    });
    this.socket.on('deleteColumn', data => {
      console.log(data);
      this.onColumnDelete.emit(<Card>data.card);
    });
    this.socket.on('updateCard', data => {
      console.log("asdfdsa");
      this.onCardUpdate.emit(<Card>data.card);
    });
    this.socket.on('deleteCard', data => {
      console.log(data);
      this.onCardDelete.emit(<Card>data.card);
    });
    
  }

  join(boardId: string) {
    this.socket.emit('joinBoard', boardId);
  }

  leave(boardId: string) {
    this.socket.emit('leaveBoard', boardId);
  }

  addColumn(boardId:string, column: Column){
    this.socket.emit('addColumn', { boardId: boardId, column: column });
  }

  addCard(boardId: string, card: Card) {
    this.socket.emit('addCard', { boardId: boardId, card: card });
  }

  updateColumn(boardId: string, column: Column) {
    this.socket.emit('updateColumn', { boardId: boardId, column: column });
  }

  deleteColumn(column: Column) {
    console.log(column);
    this.onColumnDelete.emit(column);
  }

  updateCard(boardId: string, card: Card) {
    io.sockets.emit('updateCard', { boardId: boardId, card: card });
  }

  deleteCard(card: Card) {
    console.log(card);
    this.onCardDelete.emit(card);
  }
}