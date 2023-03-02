import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { Person, Sex } from './interfaces/person';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let httpMock: HttpTestingController;

  const mockPerson: Person = {
    id: 1,
    name: 'Eliot',
    surname: 'Constans',
    surname2: 'Let',
    sex: Sex.Male,
    countryId: 1,
    phone: '935555555',
    datebirthday: new Date('2000-03-01T00:00:00'),
    lastModification: new Date('2016-03-01T12:45:00'),
  };

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getPersonData']);
    dataServiceSpy.getPersonData.and.returnValue(
      of({ population: { person: [mockPerson] } })
    );

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatPaginatorModule,
      ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: HttpClient, useClass: HttpClientTestingModule },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch person data on init', () => {
    expect(dataServiceSpy.getPersonData).toHaveBeenCalled();
    expect(component.persons$).toBeDefined();
  });

  it('should filter persons when filterPersons is called', () => {
    const spy = spyOn(component, 'fetchPeopleData').and.callThrough();
    const searchTerm = 'Eliot';

    component.filterPersons(searchTerm);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(searchTerm, 1);
    component.persons$?.subscribe((persons) => {
      expect(persons.length).toBe(1);
      expect(persons[0].name).toBe(mockPerson.name);
    });
  });

  it('should load page when loadPage is called', () => {
    const spy = spyOn(component, 'fetchPeopleData').and.callThrough();
    const pageEvent = { pageIndex: 1 } as any;

    component.loadPage(pageEvent);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(component.filter, pageEvent.pageIndex + 1);
    component.persons$?.subscribe((persons) => {
      expect(dataServiceSpy.getPersonData).toHaveBeenCalled();
    });
  });
});
