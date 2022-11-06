import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from "../../types/Lesson";

@Component({
  selector: 'app-day-of-month',
  templateUrl: './day-of-month.component.html',
  styleUrls: ['./day-of-month.component.scss']
})
export class DayOfMonthComponent implements OnInit {
  @Input() lesson: Lesson;



  constructor() {
  }



  ngOnInit(): void {
  }

}
