import {Injectable} from '@angular/core'
import config from '../../../assets/variables'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = config.baseUrl
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
