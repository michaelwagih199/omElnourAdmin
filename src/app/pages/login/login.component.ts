import { Component, OnInit, ViewEncapsulation, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit, OnDestroy {

  validateForm: FormGroup;
  invalidLogin = false
  userName = ''
  password = ''
  errorMessage = 'Invalid Credentials'

  constructor(private fb: FormBuilder,
    @Inject(DOCUMENT) private _document,
    private loginservice: AuthenticationService,
    private router: Router ) { }

  submitForm(): void {
    this.userName = this.validateForm.value.userName
    this.password = this.validateForm.value.password

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.checkLogin()
  }


  ngOnInit(): void {

    this._document.body.classList.add('bodybg-color');
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

  }

  ngOnDestroy(): void {
   this.router.navigate(['/welcome'])
  }

  checkLogin() {

    (this.loginservice.authenticate(this.userName, this.password).subscribe(
      data => {

        this.invalidLogin = false
        console.log(data)
        this.router.navigateByUrl('/welcome');
      },
      error => {
        this.invalidLogin = true
        console.log(error)
        this.invalidLogin = true
      }
    )
    );

  }

}
