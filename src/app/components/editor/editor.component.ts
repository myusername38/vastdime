import { Component, ViewChild, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from '../../services/code.service';
import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';


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

  }

  ngAfterViewInit() {
    this.loadData();
    this.aceEditor = ace.edit('javascript-editor');
    this.aceEditor.getSession().setMode('ace/mode/javascript');
    this.aceEditor.setTheme('ace/theme/monokai');
  }

  async loadData() {
    try {
      const editor = ace.edit('javascript-editor');
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
