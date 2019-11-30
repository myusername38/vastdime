import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CodeService } from '../../services/code.service';
import { CodeMetaData } from '../../interfaces/codeMetaData';

@Component({
  selector: 'app-home',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.scss']
})
export class LoadPageComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Java', 'JavaScript', 'Python'];
  filteredOptions: Observable<string[]>;
  publicCode: CodeMetaData[] = [];
  language = 'javascript';
  displayedColumns: string[] = ['title', 'description', 'username', 'date', 'view'];

  constructor(
    private router: Router,
    private codeService: CodeService,
  ) { }

  ngOnInit() {
    this.loadPublicCode();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  async loadPublicCode() {
    try {
      this.publicCode = await this.codeService.getPublicCode('javascript');
      console.log(this.publicCode);
    } catch (err) {
      console.log(err);
    } finally {

    }
  }

  loadProgram(username: string, title: string) {
    this.codeService.setProgram(username, title);
    this.router.navigate(['editor'], { queryParams: { username, title } });
  }

  load() {
    this.router.navigate(['']);
  }
}

