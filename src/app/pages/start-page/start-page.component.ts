import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  isLogin = true;
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  })

  submit() {
    this.api.operation('login', this.form.value)
      .subscribe(console.log)
  }

  changeTemplate() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        password: ['', Validators.required]
      })} else {
        this.form = this.fb.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          phone: ['', Validators.required],
          email: ['', Validators.required],
          role: [false, Validators.required],
          reg_password: ['', Validators.required]
        })
      }
  }

  constructor(private fb: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
  }

}
