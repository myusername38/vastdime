import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceEditorModule } from 'ng2-ace-editor';
import { EditorComponent } from '../components/editor/editor.component';
import { CodeEditorRoutingModule } from './code-editor-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    CodeEditorRoutingModule,
    AceEditorModule,
    MatSidenavModule,
  ]
})
export class CodeEditorModule { }
