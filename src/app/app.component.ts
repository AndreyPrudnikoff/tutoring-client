import { Component } from '@angular/core';
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tutoring';
  constructor(private api: ApiService) {
  }

  send() {
    this.api.operation('login', {hello: 'hello'}).subscribe(res => console.log({res}))
  }
}
