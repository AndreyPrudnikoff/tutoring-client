import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  day: any;

  constructor(private router: Router) {
    this.day = this.router.getCurrentNavigation().extras.state;
  }

}
