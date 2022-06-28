


import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{CookieService} from'ngx-cookie-service'
import { HttpHeaders, HttpResponse } from '@angular/common/http';





import { AuthService } from '../auth.service';

import { UserService } from '../user.service';


@Component({
  selector: 'app-logg',
  templateUrl: './logg.component.html',
  styleUrls: ['./logg.component.css']
})
export class LoggComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService,
    private router: Router, private formBuilder: UntypedFormBuilder,  private userService: UserService, private cookieService:CookieService) { } //,)//
  namePattern = "^[A-Za-z0-9_-]{5,15}$";

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  pwdPattern = "^(?=.*[A-Z])(?=.*[0-9]).{8,}$";
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]]
    });
  }

  get formControls() { return this.loginForm.controls; }
  // onConnexion() {
  //   // console.log(this.loginForm.value);
  //   this.isSubmitted = true;
  //   if (this.loginForm.invalid) {



  //     return;
  //   }




  // }
  signUp() {
     this.isSubmitted = true;   
    this.userService.addUser(this.loginForm.value).subscribe(Response => {
    
    
     
     
      
     }
       
      
      
   
     
    )
      
    
  }

  

login() {

  this.userService.connectUser(this.loginForm.value).subscribe((res)=>{
    
   
   
    
    this.router.navigate(['mainpage'])
  return this.cookieService.get('snToken')
     })


}
    
logout() {


  this.userService.disconnectUser(this.loginForm.value).subscribe();
  this.authService.logout();
  

}
}






















