import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  windowRef: any;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  register() {
    this.router.navigate(['register']);
  }

  resetPassword() {
    this.router.navigate(['reset']);
  }

  async onSubmit() {
    try {
      this.loading = true;
      await this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password);
      if (!this.afAuth.auth.currentUser.emailVerified) {
        this.afAuth.auth.signOut();
        this.snackbarService.showError('Accounnt not verified. Please check your email.');
      } else {
        this.router.navigate(['editor/user-home']);
      }
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        this.snackbarService.showError('User not found');
      } else if (err.code === 'auth/wrong-password') {
        this.snackbarService.showError('Inncorrect Password');
      } else if (err.code === 'auth/too-many-requests') {
        this.snackbarService.showError('Too many attempts please try again later');
      }
    } finally {
      this.loading = false;
    }
  }

}
