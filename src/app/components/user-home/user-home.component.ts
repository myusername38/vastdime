import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CodeService } from '../../services/code.service';
import { UserCodeData } from '../../interfaces/userCodeData';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  userCode: UserCodeData[] = [];
  language = 'javascript';
  displayedColumns: string[] = ['title', 'description', 'language', 'date', 'visibility', 'view'];
  loading = false;
  username = '';

  constructor(
    private router: Router,
    private codeService: CodeService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.loadUserCode();
    this.username = this.afAuth.auth.currentUser.displayName;
  }
  async loadUserCode() {
    try {
      this.loading = true;
      this.userCode = await this.codeService.getUserCode();
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  editor() {
    this.router.navigate(['editor']);
  }

  loadProgram(title: string) {
    const username = this.username;
    this.router.navigate(['editor'], { queryParams: { username, title } });
  }

  getSecurity(privated: boolean, unlisted: boolean) {
    if (privated) {
      return 'Private';
    } else if (unlisted) {
      return 'Unlisted';
    }
    return 'Public';
  }

  getMenu() {

  }

  async privateCode(title: string) {
    try {
      this.loading = true;
      await this.codeService.privateCode(title);
      this.loadUserCode();
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  async unListCode(title: string) {
    try {
      this.loading = true;
      await this.codeService.unListCode(title);
      this.loadUserCode();
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  async listCode(title: string) {
    try {
      this.loading = true;
      await this.codeService.listCode(title);
      this.loadUserCode();
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  async deleteCode(title: string, language: string) {
    try {
      this.loading = true;
      await this.codeService.deleteProgram(title, language);
      this.loadUserCode();
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  load() {
    this.router.navigate(['']);
  }
}

