import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  
 loginForm!: FormGroup;
  isSubmitted  =  false;
  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder ) { }

    ngOnInit() {
      this.loginForm =  this.formBuilder.group({
        userName:['', Validators.required],
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }
  get formControls() { return this.loginForm.controls; }
  connexion(){
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.connexion(this.loginForm.value);
    
  }

}