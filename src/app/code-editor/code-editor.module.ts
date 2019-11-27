import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceEditorModule } from 'ng2-ace-editor';
import { EditorComponent } from '../components/editor/editor.component';
import { CodeEditorRoutingModule } from './code-editor-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatSnackBarModule,
  MatButtonModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatMenuModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatTableModule,
  MatIconModule,
 } from '@angular/material';
import { LoadPageComponent } from '../components/load-page/load-page.component';
import { UserHomeComponent } from '../components/user-home/user-home.component';


@NgModule({
  declarations: [
    EditorComponent,
    LoadPageComponent,
    UserHomeComponent,
  ],
  imports: [
    CommonModule,
    CodeEditorRoutingModule,
    AceEditorModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatTableModule,
    MatIconModule,
  ],
})
export class CodeEditorModule { }
