import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterValue: string = '';

  constructor() { }

  filter(data) {
    return data.filter((item) => item.title.toUpperCase().indexOf(this.filterValue.toUpperCase()) >= 0);
  }
}
