import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CodeService } from '../../services/code.service';
import { CodeMetaData } from '../../interfaces/codeMetaData';

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

  constructor(
    private router: Router,
    private codeService: CodeService,
  ) { }

  ngOnInit() {
    this.loadPublicCode(this.selectedLanguage);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  async loadPublicCode(language: string) {
    if (this.loading) {
      return;
    }
    try {
      this.loading = true;
      this.publicCode = await this.codeService.getPublicCode(language);
       // @ts-ignore
      this.publicCode = this.publicCode.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
      console.log(this.publicCode);
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

