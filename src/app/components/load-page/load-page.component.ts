import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CodeService } from '../../services/code.service';
import { CodeMetaData } from '../../interfaces/codeMetaData';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.scss']
})
export class LoadPageComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Java', 'JavaScript', 'Python'];
  filteredOptions: Observable<string[]>;
  publicCode: CodeMetaData[] = [];
  language = 'javascript';
  displayedColumns: string[] = ['title', 'description', 'username', 'date', 'view'];
  selectedLanguage = 'javascript';
  languages = [
    'javascript',
    'java',
    'python'
  ];
  loading = false;
  firstLoad = true;
  delayFunction = false;
  privous = '';
  first = true;

  constructor(
    private router: Router,
    private codeService: CodeService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    setTimeout(() => {
      this.loadPublicCode(this.selectedLanguage);
    }, 500);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  removeUnderline(name: string) {
    return name.replace(/_/g, ' ');
  }

  displayError() {
    if (this.delayFunction) {
      this.snackbarService.showError('Too many requests! Slow Down!');
    }
  }

  async loadPublicCode(language: string) {
    if (this.loading && !this.firstLoad) {
      return;
    }
    if (this.delayFunction) {
      return;
    }
    try {
      this.privous = language;
      this.loading = true;
      if (!this.firstLoad) {
        setTimeout(() => { this.delayFunction = true; }, 100);
        setTimeout(() => { this.delayFunction = false; }, 1500);
      } else {
        this.firstLoad = false;
      }
      this.publicCode = await this.codeService.getPublicCode(language);
       // @ts-ignore
      this.publicCode = this.publicCode.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  loadProgram(username: string, title: string) {
    this.codeService.setProgram(username, title);
    this.router.navigate(['editor'], { queryParams: { username, title } });
  }

  load() {
    this.router.navigate(['']);
  }
}

