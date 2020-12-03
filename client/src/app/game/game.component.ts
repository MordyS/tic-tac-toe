import { Component, OnInit } from '@angular/core';
import { LogicService } from './../logic.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  symbol: string;
  myTurn: boolean;
  msg: string;
  endGame: string;
  squares = Array.apply(null, Array(9)).map(_ => ({ value: '', status: '' }))
  winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  constructor(private logic: LogicService) { }

  ngOnInit(): void {
    this.logic.startGame()
    this.logic.getMessage().subscribe((message: any) => {
      if (message == 'opponent left') {
        this.squares.forEach(s => s.value = s.status = '')
      }
      this.msg = message
    })
    this.logic.getSymbol().then((symbol: string) => {
      this.symbol = symbol
      this.myTurn = symbol === 'X'
    })
    this.logic.madeMove().subscribe((move: any) => {
      this.squares[move.index].value = move.symbol
      this.myTurn = !this.myTurn
      this.checkWinner()
    })
  }

  handleClick(i) {
    if (!this.myTurn || this.squares[i].value || this.endGame) return
    this.squares[i].value = this.symbol
    this.logic.clicked(i, this.symbol)
    this.myTurn = !this.myTurn
    this.checkWinner()
  }

  checkWinner() {
    this.winCombinations.forEach((c: any) => {
      let winner = this.checkCombination(c)
      if (winner) {
        c.forEach(i => this.squares[i].status = (winner == this.symbol ? 'won' : 'lost'))
        this.msg = winner == this.symbol ? 'Yay! You won!!!' : 'Oops... Maybe next time'
        this.endGame = winner == this.symbol ? 'won' : 'lost'
      }
    })
  }

  checkCombination([a, b, c]) {
    if (this.squares[a].value == this.squares[b].value &&  this.squares[b].value == this.squares[c].value)
      return this.squares[a].value
    else
      return ''
  }

}
