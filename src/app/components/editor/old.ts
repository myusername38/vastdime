/*
import { Component, ViewChild, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CodeService } from '../../services/code.service';
import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('editor', { static: false }) editor;

  testComponent = null;
  username = '';
  title = '';
  loading = false;
  code = '';
  aceEditor = null;
  languageControl = new FormControl();
  selectedLanguage = 'javascript';
  options: Language[] = [
    {name: 'Javascript'},
    {name: 'Java'},
    {name: 'Python'}
  ];
  filteredOptions: Observable<Language[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private codeService: CodeService) {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.title = params['title'];
      console.log(this.title);
    });
  }

  ngOnInit() {
    this.filteredOptions = this.languageControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  ngAfterViewInit() {
    this.loadData();
    this.setEditor();
  }

  displayFn(user?: Language): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Language[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  setEditor() {
    this.aceEditor = ace.edit('editor-vastdime');
    this.aceEditor.getSession().setMode(`ace/mode/${ this.selectedLanguage }`);
    this.aceEditor.setTheme('ace/theme/monokai');
  }

  async loadData() {
    try {
      this.loading = true;
      const response = await this.codeService.getprogram(this.username, this.title);
      this.code = response.program.program;
      this.aceEditor.setValue(this.code);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  setBoard(code: string) {
    const unsantized = this.reinstateQuote(code);
    this.aceEditor.setValue(unsantized);
  }

  getValue() {
    let here = this.testComponent.getValue();
    eval(here);
  }

  removeQuote() {
    let here = this.testComponent.getValue();
    let replace = /"/gi;
    let result = here.replace(replace, '~');
    console.log(result);
  }

  reinstateQuote(code: string) {
    const replace = /~/gi;
    return code.replace(replace, '"');
  }



}

/*
<div class="button-row" fxLayout="row">
  <button mat-button>Save</button>
  <button mat-button>Save as</button>
  <button mat-button>Get Link</button>
  <form class="example-form">
      <mat-form-field class="">
        <input type="text" placeholder="Language" aria-label="Assignee" matInput [formControl]="languageControl" [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
          <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
            {{option.name}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </form>
</div>


<div id="parent">
  <div id="editor-vastdime"></div>
</div>

<button (click)='removeQuote()'>get value</button>



*/


