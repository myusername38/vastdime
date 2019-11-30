import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceEditorModule } from 'ng2-ace-editor';
import { EditorComponent } from '../components/editor/editor.component';
import { CodeEditorRoutingModule } from './code-editor-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  MatRadioModule,
  MatDialogModule,
 } from '@angular/material';
import { LoadPageComponent } from '../components/load-page/load-page.component';
import { UserHomeComponent } from '../components/user-home/user-home.component';
import { SaveDialogComponent } from '../components/save-dialog/save-dialog.component';
import { ShareLinkDialogComponent } from '../components/share-link-dialog/share-link-dialog.component';


@NgModule({
  declarations: [
    EditorComponent,
    LoadPageComponent,
    UserHomeComponent,
    SaveDialogComponent,
    ShareLinkDialogComponent,
  ],
  imports: [
    CommonModule,
    CodeEditorRoutingModule,
    AceEditorModule,
    FlexLayoutModule,
    CdkTableModule,
    ReactiveFormsModule,
    FormsModule,
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
    MatRadioModule,
    MatDialogModule,
  ],
  entryComponents: [
    SaveDialogComponent,
    ShareLinkDialogComponent,
  ],
})
export class CodeEditorModule { }
