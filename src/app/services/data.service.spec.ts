import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { ServicePerson, Sex } from '../interfaces/person';
import { HttpErrorResponse } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve person data from the API via GET', () => {
    const mockData: ServicePerson = {
      population: {
        person: [
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
            sex: Sex.Male,
            countryId: 2,
            phone: '12335555555',
            datebirthday: new Date('1999-03-01T00:00:00'),
            lastModification: new Date('2012-03-01T12:45:00'),
          },
        ],
      },
    };

    service.getPersonData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne(
      'https://storage.googleapis.com/web-aktios/entrevista-tecnica/info-population.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle error during HTTP request', () => {
    const mockError = { status: 404, statusText: 'Not Found' };
    service.getPersonData().subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(jasmine.any(HttpErrorResponse));
        expect(error.status).toEqual(mockError.status);
        expect(error.statusText).toEqual(mockError.statusText);
      }
    );
    const req = httpMock.expectOne(
      'https://storage.googleapis.com/web-aktios/entrevista-tecnica/info-population.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });
});
