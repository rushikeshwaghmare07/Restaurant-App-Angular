import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit 
{
  signupForm!: FormGroup
  constructor(private _fb: FormBuilder, private _http:HttpClient, private _router:Router, private _toast: NgToastService) 
  { }

  ngOnInit(): void 
  {
    this.signupForm = this._fb.group({
      name:['', Validators.required],
      email:['', Validators.compose([Validators.required, Validators.email])],
      mobile:['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signUp()
  {
    this._http.post<any>('http://localhost:3000/signup',this.signupForm.value)
    .subscribe(res =>{
      console.log(res)
      // alert('Signup Successfully');
      this._toast.success({detail: "Success message", summary: "User register successfully"});
      this.signupForm.reset();
      this._router.navigate(['/login']);
    },
    err=>{
      console.log(err);
      // alert('Signup Error');
      this._toast.error({detail: "Error message", summary: "Something went wrong !!"});
    })
  }

}
