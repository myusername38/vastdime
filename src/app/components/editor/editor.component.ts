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

  ngAfterViewInit() {
    const editor = ace.edit('javascript-editor');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/monokai');

  }


  getValue() {
    console.log(this.editor.value);
  }
}
