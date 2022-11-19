import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/api/auth.service";
import {ApiService} from "../../services/api/api.service";
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
log() {
  for (const control in this.form.controls) {
    console.log(this.form.controls?.[control]?.errors)
  }
}
  isLogin = true;
  formFields = formFields;
  mode = 'Registration';
  roles = ['tutor', 'student'];
  loginForm = {
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]],
    user_role: this.roles[0]
  }
  regForm = {
    first_name: [null, [Validators.required,
      Validators.pattern(/^[а-яєіїьa-z]+([а-яєіїьa-z]|([а-яєіїьa-z][-' ]{1}[а-яєіїьa-z])){1,50}$/ui)]],
    last_name: [null, Validators.required],
    phone: [null, Validators.required],
    email: [null, Validators.required],
    user_role: this.roles[0],
    reg_password: [null, Validators.required]
  }
  form: FormGroup = this.fb.group(this.loginForm)

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private api: ApiService,
              private state: StateService,
              private router: Router) {
  }

  register() {
    this.auth.register(this.form.value)
      .subscribe(
        () => this.changeTemplate(),
        (error) => console.log(error)
      );
  }

  login() {
    this.auth.login(this.form.value)
      .subscribe(async (response: LoginResponse) => {
        if (response.success) {
          this.state.user = response.data;
          this.state.user_role = this.form.value.user_role;
          this.api.saveLoginResponse(response, this.form.value.user_role);
          await this.router.navigate(['schedule']);
        }
      });
  }

  changeTemplate() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.mode = 'Registration';
      this.form = this.fb.group(this.loginForm)
    } else {
      this.mode = 'Login';
      this.form = this.fb.group(this.regForm)
    }
  }


  ngOnInit(): void {
  }

}
