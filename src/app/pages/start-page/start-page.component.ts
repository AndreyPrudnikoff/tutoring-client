import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {LoginResponse} from "../../types/api";

const formFields = [
  {
    type: 'text',
    text: 'Your first name',
    field: 'first_name'
  }, {
    type: 'text',
    text: 'Your last name',
    field: 'last_name'
  }, {
    type: 'text',
    text: 'Your phone',
    field: 'phone'
  }, {
    type: 'text',
    text: 'Your email',
    field: 'email'
  }, {
    type: 'password',
    text: 'Your password',
    field: 'reg_password'
  }
]

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  isLogin = true;
  formFields = formFields;
  mode = 'Registration';
  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: false
  })

  register() {
    this.api.operation('register', this.form.value)
      .subscribe(console.log)
  }
  lessons() {
    this.api.basicOperation('lessons', this.form.value)
      .subscribe(console.log)
  }
  login() {
    this.api.operation('login', this.form.value)
      .subscribe((response: LoginResponse) => {
        if (response.success) {
          this.api.token = response.token || '';
        }
      })
  }

  changeTemplate() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.mode = 'Registration';
      this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        role: false
      })
    } else {
      this.mode = 'Login';
      this.form = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        role: false,
        reg_password: ['', Validators.required]
      })
    }
  }

  log() {
    console.log(this.form.get('role')?.value)
  }

  constructor(private fb: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
  }

}
