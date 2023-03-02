import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Person } from 'src/app/interfaces/person';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() persons: Observable<Person[]> | undefined;
  width = '350px';
  height = '400px';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openPersonDialog(person: Person): void {
    this.dialog.open(PersonDialogComponent, {
      width: this.width,
      height: this.height,
      data: person,
    });
  }
}
