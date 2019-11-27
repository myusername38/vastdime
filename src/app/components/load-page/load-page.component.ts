import { Component, OnInit } from '@angular/core';
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

  loadPublicCode() {
    this.codeService.getPublicCode(this.language).then((res) => {
      this.publicCode = res;
      console.log(res);
    });
  }

  load() {
    this.router.navigate(['']);
  }


}

