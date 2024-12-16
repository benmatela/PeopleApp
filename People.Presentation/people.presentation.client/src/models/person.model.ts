/**
 * Person
 */
export interface IPerson {
  id?: string;
  dateCreated?: Date;
  dateOfBirth: Date;
  age: number;
  firstName: string;
  lastName: string;
}

/**
 * DTO used to transfer person(s) data
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPersonResponse extends IPerson {
 
}

/**
 * DTO used to transfer person search query
 */
export interface ISearchPersonRequest
{
    firstName: string;
    lastName: string;
}
