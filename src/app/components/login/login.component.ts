import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  error: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login() {
    this.error = false;
    this.loading = true;

    const formValues = this.form.value;

    this.authService
    .login(formValues.username, formValues.password)
    .subscribe(
      () => this.router.navigateByUrl('/'),
      () => {
        this.error = true;
        this.loading = false;
      }
    );
  }

}
