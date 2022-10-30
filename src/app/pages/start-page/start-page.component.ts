import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ApiService} from "../../services/api.service";
import {LoginResponse} from "../../types/api";
import {Router} from "@angular/router";
import {StateService} from "../../services/state.service";

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
  roles = ['tutor', 'student'];
  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private api: ApiService,
              private state: StateService,
              private router: Router) {
  }

  register() {
    this.auth.register(this.form.value)
      .subscribe(() => this.changeTemplate())
  }

  login() {
    this.auth.login(this.form.value)
      .subscribe(async (response: LoginResponse) => {
        if (response.success) {
          this.state.user = response.data;
          this.api.saveLoginResponse(response);
          await this.router.navigate(['schedule']);
        }
      })
  }

  changeTemplate() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.mode = 'Registration';
      this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
    } else {
      this.mode = 'Login';
      this.form = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        user_role: this.roles[0],
        reg_password: ['', Validators.required]
      })
    }
  }


  ngOnInit(): void {
  }

}
