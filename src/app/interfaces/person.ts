export interface ServicePerson {
  population: {
    person: Person[];
  };
}

export interface Person {
  id: number;
  name: string;
  surname: string;
  surname2: string;
  sex: Sex;
  countryId: number;
  phone: string;
  datebirthday: Date;
  lastModification: Date;
}

export enum Sex {
  Male = 'M',
  Female = 'F',
}

export const FIRST_PAGE = 1;
export const PAGE_SIZE = 5;
