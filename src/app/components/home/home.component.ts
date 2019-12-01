import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {

  }

  login() {
    if (this.afAuth.auth.currentUser) {
      this.router.navigate(['editor/user-home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  register() {
    this.router.navigate(['register']);
  }

  about() {
    this.router.navigate(['about']);
  }

  home() {
    let elmnt = document.getElementById('top');
    elmnt.scrollIntoView(true);
  }

  scroll() {
    let elmnt = document.getElementById('bottom');
    elmnt.scrollIntoView(true);
  }
}
