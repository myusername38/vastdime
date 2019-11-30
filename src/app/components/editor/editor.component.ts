import { Component, ViewChild, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from '../../services/code.service';
import { UserCodeData } from '../../interfaces/userCodeData';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';
import { ShareLinkDialogComponent } from '../share-link-dialog/share-link-dialog.component';
import { SnackbarService } from '../../services/snackbar.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/monokai';
import { MatDialog } from '@angular/material';

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
  program: UserCodeData = null;
  aceEditor = null;
  selectedLanguage = 'javascript';
  owner = false;
  loggedIn = false;
  languages = [
    'javascript',
    'java',
    'python'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private codeService: CodeService,
    private snackbarService: SnackbarService,
    private afAuth: AngularFireAuth,
    private dialog: MatDialog) {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.title = params['title'];
    });
  }

  ngOnInit() {
    if (this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.displayName === this.username) {
      this.owner = true;
    }
    if (this.afAuth.auth.currentUser) {
      this.loggedIn = true;
    }
  }

  async ngAfterViewInit() {
    if (this.username && this.title) {
      this.loadData();
    }
    this.setAce(this.selectedLanguage);
  }

  setAce(language: string) {
    this.aceEditor = ace.edit('javascript-editor');
    this.aceEditor.getSession().setMode(`ace/mode/${ language }`);
    this.aceEditor.setTheme('ace/theme/monokai');
  }

  async loadData() {
    try {
      this.loading = true;
      const response = await this.codeService.getprogram(this.username, this.title);
      this.program = response.program;
      this.aceEditor.setValue(this.program.program);
      if (this.program.language !== 'javascript') {
        this.aceEditor.getSession().setMode(`ace/mode/${ this.program.language }`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  login() {

  }

  share() {
    const data = {
      title: this.title,
      username: this.username,
    };
    const dialogRef = this.dialog.open(ShareLinkDialogComponent, {
      width: '500px',
      data,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  save() {
    if (this.removeQuote().trim() === '') {
      this.snackbarService.showError('Cannot save an empty program');
      return;
    }
    let data = null;
    if (!this.program) {
      this.saveAs();
    } else {
      data.title = this.program.title;
      data.description = this.program.description;
      data.language = this.selectedLanguage;
      data.program = this.removeQuote();
      this.codeService.putProgramNoVisibility(data);
    }
  }

  saveAs() {
    if (this.removeQuote().trim() === '') {
      this.snackbarService.showError('Cannot save an empty program');
      return;
    }
    let data;
    if (this.program) {
      data = this.program;
      data.language = this.selectedLanguage;
      data.program = this.removeQuote();
    } else {
      data = {
        language: this.selectedLanguage,
        program: this.removeQuote()
      };
    }
    const dialogRef = this.dialog.open(SaveDialogComponent, {
      width: '500px',
      data,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  setBoard(code: string) {
    const unsantized = this.reinstateQuote(code);
    this.aceEditor.setValue(unsantized);
  }

  getValue() {
    let here = this.aceEditor.getValue();
    eval(here);
  }

  removeQuote() {
    const here = this.aceEditor.getValue();
    const replace = /"/gi;
    const result = here.replace(replace, '~');
    return result;
  }

  reinstateQuote(code: string) {
    const replace = /~/gi;
    return code.replace(replace, '"');
  }
}
