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
  getMessage() {
    return this.socket.fromEvent("message")
  }
  getSymbol() {
    return this.socket.fromOneTimeEvent("symbol")
  }
  clicked(index, symbol) {
    this.socket.emit("clicked", {index, symbol})
  }
  madeMove() {
    return this.socket.fromEvent("madeMove")
  }
}
