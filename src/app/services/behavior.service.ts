import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalErrorComponent} from "../components/modal-error/modal-error.component";

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  constructor(private modalWindow: NgbModal) {
  }

  openModal(error: Error & {status: number}, timeout = 0) {
    const modalRef = this.modalWindow.open(
      ModalErrorComponent,
      {
        windowClass: 'modal-error',
        backdrop: 'static',
        keyboard: false,
        container: 'app-root',
        animation: true
      });
    modalRef.componentInstance.error = error;
    setTimeout(() => modalRef.close(), timeout)
  }
}
