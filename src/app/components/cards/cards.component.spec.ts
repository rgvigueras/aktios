import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Person, Sex } from 'src/app/interfaces/person';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';
import { CardsComponent } from './cards.component';

export const persons = [
  {
    id: 1,
    name: 'Eliot',
    surname: 'Constans',
    surname2: 'Let',
    sex: Sex.Male,
    countryId: 1,
    phone: '935555555',
    datebirthday: new Date('2000-03-01T00:00:00'),
    lastModification: new Date('2016-03-01T12:45:00'),
  },
  {
    id: 2,
    name: 'Sandra',
    surname: 'Constans',
    surname2: 'Alter',
    sex: Sex.Female,
    countryId: 1,
    phone: '12335555555',
    datebirthday: new Date('1999-03-01T00:00:00'),
    lastModification: new Date('2012-03-01T12:45:00'),
  },
];

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let mockPersons$: Observable<Person[]>;
  let mockDialog: MatDialog;

  beforeEach(async () => {
    mockPersons$ = of(persons);

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [CardsComponent],
      providers: [{ provide: MatDialog, useValue: mockDialog }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    component.persons = mockPersons$;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a card for each person', () => {
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(2);
  });

  it('should open the person dialog with the correct data when a card is clicked', () => {
    const card = fixture.debugElement.query(By.css('.card'));
    card.triggerEventHandler('click', null);
    expect(mockDialog.open).toHaveBeenCalledWith(PersonDialogComponent, {
      width: '350px',
      height: '400px',
      data: persons[0],
    });
  });
});
