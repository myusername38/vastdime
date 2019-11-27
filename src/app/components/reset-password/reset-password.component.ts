import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { AngularFireAuth } from '@angular/fire/auth';


export class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  loading = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  matcher2 = new EmailErrorStateMatcher();
  resetSent = false;

  constructor(private router: Router,
              private snackbarService: SnackbarService,
              public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  login() {
    this.router.navigate(['login']);
  }

  async sendEmail(username, password) {
    await this.afAuth.auth.signInWithEmailAndPassword(username, password);
    setTimeout(() => { this.afAuth.auth.currentUser.sendEmailVerification(); }, 1000);
  }

  async onSubmit() {
    try {
      const formData = this.resetForm.getRawValue();
      this.loading = true;
      await this.afAuth.auth.sendPasswordResetEmail(formData.email);
      this.resetSent = true;
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        this.snackbarService.showError('No user associated with this email');
      } else if (err.code === 'auth/invalid-email') {
        this.snackbarService.showError('Invalid Email');
      } else {
        console.log(err);
      }
    } finally {
      this.loading = false;
    }
  }

}


