import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/api'
  token = sessionStorage.getItem('token') || '';

  constructor() {
  }

  saveLoginResponse(response: any) {
    if (response && response.token) {
      try {
        sessionStorage.setItem('token', response.token);
        this.token = response.token;
      } catch (e) {
        console.error(e)
      }
    }
  }
}
