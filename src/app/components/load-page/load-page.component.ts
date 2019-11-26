import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.scss']
})
export class LoadPageComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Java', 'JavaScript', 'Python'];
  filteredOptions: Observable<string[]>;


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  constructor(private router: Router) { }

  load() {
    this.router.navigate(['']);
  }


}

