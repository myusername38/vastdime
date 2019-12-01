import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CodeService } from '../../services/code.service';
import { UserCodeData } from '../../interfaces/userCodeData';
import { AngularFireAuth } from '@angular/fire/auth';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  myControl = new FormControl();
  autoComplete: FormGroup;
  filteredOptions: Observable<string[]>;
  userCode: UserCodeData[] = [];
  language = 'javascript';
  displayedColumns: string[] = ['title', 'description', 'language', 'date', 'visibility', 'view'];
  loading = false;
  username = '';
  noCode = false;
  options: string[] = [];
  codeToLoad = '';

  constructor(
    private router: Router,
    private codeService: CodeService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.loadUserCode();
    this.username = this.afAuth.auth.currentUser.displayName;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.autoComplete = new FormGroup({
      title: new FormControl(''),
    });
  }

  onSubmit() {
    this.loadProgram(this.codeToLoad);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  removeUnderline(name: string) {
    return name.replace(/_/g, ' ');
  }

  lastSet(name: string) {
    this.codeToLoad = name;
    return name.replace(/_/g, ' ');
  }

  async loadUserCode() {
    try {
      this.loading = true;
      this.userCode = await this.codeService.getUserCode();
       // @ts-ignore
      this.userCode = this.userCode.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
      this.options = this.userCode.map(p => p.title);
      if (!this.userCode[0]) {
        this.noCode = true;
      }
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

