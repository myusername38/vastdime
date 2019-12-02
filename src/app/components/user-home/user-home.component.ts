import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CodeService } from '../../services/code.service';
import { UserCodeData } from '../../interfaces/userCodeData';
import { AngularFireAuth } from '@angular/fire/auth';
import { startWith, map } from 'rxjs/operators';
import { SnackbarService } from '../../services/snackbar.service';


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
  username = 'User';
  noCode = false;
  options: string[] = [];
  codeToLoad = '';

  constructor(
    private router: Router,
    private codeService: CodeService,
    private afAuth: AngularFireAuth,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.autoComplete = new FormGroup({
      title: new FormControl(''),
    });
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    setTimeout(() => {
      this.loadUserCode();
      this.username = this.afAuth.auth.currentUser.displayName;
    }, 500);
  }

  onSubmit() {
    /* Note: This is very hacky but I need to study for finals  ¯\_(ツ)_/¯*/
      // @ts-ignore
    const userInput = document.getElementById('load-code-input').value;
    if (userInput && this.userCode.find(c => c.title === this.codeToLoad) && userInput === this.removeUnderline(this.codeToLoad) ) {
      this.loadProgram(this.codeToLoad);
    } else {
      this.snackbarService.showError('Document does not exist');
    }
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

  async privateCode(title: string) {
    try {
      this.loading = true;
      await this.codeService.privateCode(title);
      this.loadUserCode();
      this.snackbarService.showInfo('Code privated');
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
      this.snackbarService.showInfo('Code unlisted');
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
      this.snackbarService.showInfo('Code listed');
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

