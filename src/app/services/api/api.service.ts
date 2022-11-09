import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://tutoring.fly.dev/api'
  token = sessionStorage.getItem('token') || '';

  constructor() {
  }

  saveLoginResponse(response: any, role: string) {
    if (response && response.token) {
      try {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        sessionStorage.setItem('user_role', role.toString());
        this.token = response.token;
      } catch (e) {
        console.error(e)
      }
    }
  }
}
