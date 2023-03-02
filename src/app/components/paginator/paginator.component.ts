import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE } from 'src/app/interfaces/person';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Output() loadPageEvent: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  @Input() length: number | undefined;
  pageSize = PAGE_SIZE;

  constructor() {}

  ngOnInit(): void {}

  loadPage(pageEvent: PageEvent): void {
    this.loadPageEvent.emit(pageEvent);
  }
}
