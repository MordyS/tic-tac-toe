import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor(private socket: Socket) { }

  startGame() {
    this.socket.emit("start");
  }
  newGame() {
    this.socket.emit("newGame");
  }
  getMessage() {
    return this.socket.fromEvent("message")
  }
  getSymbol() {
    return this.socket.fromEvent("symbol")
  }
  clicked(index, symbol) {
    this.socket.emit("clicked", { index, symbol })
  }
  madeMove() {
    return this.socket.fromEvent("madeMove")
  }
  myTurn() {
    return this.socket.fromEvent("myTurn")
  }
}
