import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit() {
    console.log('%cBy Mordy Stern 😀', 'color:powderBlue;background:#003342;font-size:2em;padding:20px');
  }
}
