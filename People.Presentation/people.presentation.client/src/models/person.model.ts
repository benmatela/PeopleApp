/**
 * Person
 */
export interface IPerson {
  id: string;
  dateCreated: Date;
  dateOfBirth: Date;
  age: number;
  firstName: string;
  lastName: string;
}

/**
 * DTO used to transfer a person(s) data
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPersonResponse extends IPerson {
 
}
