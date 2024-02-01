import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit 
{
  loginForm!: FormGroup;

  constructor(private _fb: FormBuilder, private _http:HttpClient, private _router:Router, private _toast: NgToastService) { }

  ngOnInit(): void 
  {
    this.loginForm = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  logIn() {
    this._http.get<any>("http://localhost:3000/signup")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        });
        if (user) {
          // alert("Login Success");
          this._toast.success({detail: "Success message", summary: "Login successful", duration: 3500});
          this.loginForm.reset();
          this._router.navigate(['restaurent']);
        } else {
          // alert("User not found !!");
          this._toast.error({detail: "Error message", summary: "User not found !!", duration: 3500});
        }
      },
      err => {
        // alert("Something went wrong !!");
        this._toast.warning({detail: "Error message", summary: "Login failed, try again later !!"});
      });
  }  
}