/**
 * Groups common properties for all person requests
 */
interface IBasePersonRequest {
  firstName: string;
  lastName: string;
}

/**
 * DTO used to create a new person
 */
export interface ICreatePersonRequest extends IBasePersonRequest {
  dateOfBirth: string;
}

/**
 * DTO used to update a person
 */
export interface IUpdatePersonRequest extends IBasePersonRequest {
  id: string;
  age: number;
  dateCreated: string;
}

/**
 * DTO used to transfer a person(s) data
 */
export interface IPersonResponse extends IBasePersonRequest {
  id: string;
  dateCreated: string;
  dateOfBirth: string;
  age: number;
}
