import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements AfterViewInit {

  @ViewChild('editor', { static: false }) editor;

  testComponent = null;

  ngAfterViewInit() {
    const editor = ace.edit('javascript-editor');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/monokai');
    this.testComponent = editor;
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

  reinstateQuote() {
    let here = this.testComponent.getValue();
    let replace = /~/gi;
    let result = here.replace(replace, '"');
    console.log(result);
  }



}
