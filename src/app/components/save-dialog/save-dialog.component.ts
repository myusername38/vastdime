import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeService } from '../../services/code.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackbarService } from '../../services/snackbar.service';


@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent implements OnInit {
  saveData = null;
  loading = false;
  saveForm: FormGroup;
  visibility = 'public';

  constructor(
  public dialogRef: MatDialogRef<SaveDialogComponent>,
  private codeService: CodeService,
  private router: Router,
  private afAuth: AngularFireAuth,
  private snackbarService: SnackbarService,
  @Inject(MAT_DIALOG_DATA) public data) {
    this.saveData = data;
  }

  ngOnInit(): void {
    let title = '';
    let description = '';
    if (this.saveData.title ) {
      title = this.removeUnderline(this.saveData.title);
    }
    if (this.saveData.description) {
      description = this.saveData.description;
    }
    if (this.saveData.visibility) {
      this.visibility = this.saveData.visibility;
    }
    this.saveForm = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      visibility: new FormControl(this.visibility),
    });
  }

  close() {
    this.dialogRef.close();
  }

  removeUnderline(name: string) {
    return name.replace(/_/g, ' ');
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
    const titleValidation = /^[\w\-\s]+$/;
    if (!formData.title.toLowerCase().match(titleValidation)) {
      this.snackbarService.showError('Invalid title. No special characters');
      return;
    }

    try {
      this.loading = true;
      const title = formData.title.replace(/ /g, '_');
      await this.codeService.putProgram(program);
      this.router.navigate(['editor'], { queryParams: { username: this.afAuth.auth.currentUser.displayName, title } });
      setTimeout(() => location.reload(), 200);
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
