import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private localStorage:LocalStorageService,private router:Router) { }

  register(data) {
  
  this.localStorage.setLocalStorageMultipleData(data);
  this.router.navigate(['login']);
  }
}
