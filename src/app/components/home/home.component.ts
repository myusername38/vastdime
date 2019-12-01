import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
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
