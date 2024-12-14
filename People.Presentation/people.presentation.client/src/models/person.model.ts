/**
 * Groups common properties for all person requests
 */
interface IBasePersonRequest
{
    firstName: string;
    lastName: string
}

/**
 * Used to create a new person
 */
export interface ICreatePersonRequest extends IBasePersonRequest
{
    dateCreated: string;
    dateOfBirth: string;
    age: number;
}

/**
 * Used to update an existing person
 */
export interface IUpdatePersonRequest extends IBasePersonRequest
{
    id: string;
}

/**
 * Used to transfer existing person(s) data
 */
export interface IPersonResponse extends IBasePersonRequest
{
    id: string;
    dateCreated: string;
    dateOfBirth: string;
    age: number;
}
