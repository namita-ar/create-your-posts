import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public toastr: ToastrService) { }

  showSuccess(title,message) {
    this.toastr.success(title,message);
  }
  showError(title,message) {
    this.toastr.error(title,message);
  }
}
