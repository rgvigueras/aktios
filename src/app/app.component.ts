import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable, tap } from 'rxjs';
import { Person, PAGE_SIZE, FIRST_PAGE } from './interfaces/person';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  persons$: Observable<Person[]> | undefined;
  length: number | undefined;
  filter: string = '';
  page: number = FIRST_PAGE;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.persons$ = this.fetchPeopleData(this.filter, this.page);
  }

  fetchPeopleData(filter: string, page: number): Observable<Person[]> {
    if (filter === this.filter && page === this.page && this.persons$) {
      return this.persons$;
    }

    const startIndex = (page - FIRST_PAGE) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return this.dataService.getPersonData().pipe(
      map((data) => {
        let filteredData = data.population.person;
        if (filter && filter.length > 0) {
          filteredData = filteredData.filter((person) =>
            Object.values(person).some(
              (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(filter.toLowerCase())
            )
          );
        }
        this.length = filteredData.length;
        return filteredData.slice(startIndex, endIndex);
      }),
      tap(() => {
        this.filter = filter;
        this.page = page;
      })
    );
  }

  filterPersons(searchTyped: string): void {
    this.persons$ = this.fetchPeopleData(searchTyped, FIRST_PAGE);
  }

  loadPage(pageEvent: PageEvent): void {
    this.persons$ = this.fetchPeopleData(
      this.filter,
      pageEvent.pageIndex + FIRST_PAGE
    );
  }
}
