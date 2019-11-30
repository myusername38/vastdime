import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeService } from '../../services/code.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent implements OnInit {
  saveData = null;
  loading = false;
  saveForm: FormGroup;

  constructor(
  public dialogRef: MatDialogRef<SaveDialogComponent>,
  private codeService: CodeService,
  @Inject(MAT_DIALOG_DATA) public data) {
    this.saveData = data;
  }

  ngOnInit(): void {
    let title = '';
    let description = '';
    if (this.saveData.title ) {
      title = this.saveData.title;
    }
    if (this.saveData.description) {
      description = this.saveData.description;
    }
    this.saveForm = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      visibility: new FormControl(this.saveData.visibility)
    });
  }

  close() {
    this.dialogRef.close();
  }

  async onSubmit() {
    const formData = this.saveForm.getRawValue();
    const program = {
      title: formData.title,
      description: formData.description,
      language: this.saveData.language,
      program: this.saveData.program,
      private: (formData.visibility === 'private'),
      unlisted: (formData.visibility === 'unlisted')
    };

    try {
      this.loading = true;
      await this.codeService.putProgram(program);
      this.dialogRef.close();
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  click(result) {
    this.dialogRef.close(result);
  }

}
