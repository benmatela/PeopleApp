import axios, { HttpStatusCode } from "axios";
import { IResponseWrapper } from "../models/response.model";
import { people } from "../constants";
import { IPerson, IPersonResponse } from "../models/person.model";
import configUtils from "../utils/config.utils";

/**
 * Creates a new person
 *
 * @param {IPerson} person
 *
 * @returns {IResponseWrapper<IPersonResponse>} response
 *
 * @throws {Error} error
 */
export const create = async (
  person: IPerson
): Promise<IResponseWrapper<IPersonResponse>> => {
  try {
    const headersConfig = {
      headers: {},
    };

    const apiResponse = await axios.post(
      `${configUtils.server.peopleApiBaseUrl}/${people}/Create`,
      person,
      headersConfig
    );

    // Build our response
    const responseWrapper = {} as IResponseWrapper<IPersonResponse>;
    responseWrapper.data = apiResponse.data.data;
    responseWrapper.statusCode = HttpStatusCode.Ok;
    responseWrapper.message = "";
    responseWrapper.success = true;

    return responseWrapper;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Gets all people
 *
 * @returns {IResponseWrapper<IPersonResponse[]>} response
 *
 * @throws {Error} error
 */
export const getAll = async (): Promise<
  IResponseWrapper<IPersonResponse[]>
> => {
  try {
    const headersConfig = {
      headers: {},
    };

    const apiResponse = await axios.get(
      `${configUtils.server.peopleApiBaseUrl}/${people}/GetAll`,
      headersConfig
    );

    // Build our response
    const responseWrapper = {} as IResponseWrapper<IPersonResponse[]>;
    responseWrapper.data = apiResponse.data.data;
    responseWrapper.statusCode = HttpStatusCode.Ok;
    responseWrapper.message = "";
    responseWrapper.success = true;

    return responseWrapper;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Updates a person
 *
 * @param {IPerson} person
 *
 * @returns {IResponseWrapper<IPersonResponse>} response
 *
 * @throws {Error} error
 */
export const update = async (
  person: IPerson
): Promise<IResponseWrapper<IPersonResponse>> => {
  try {
    const headersConfig = {
      headers: {},
    };

    const apiResponse = await axios.put(
      `${configUtils.server.peopleApiBaseUrl}/${people}/Update/${person.id}`,
      person,
      headersConfig
    );

    // Build our response
    const responseWrapper = {} as IResponseWrapper<IPersonResponse>;
    responseWrapper.data = apiResponse.data.data;
    responseWrapper.statusCode = HttpStatusCode.Ok;
    responseWrapper.message = "";
    responseWrapper.success = true;

    return responseWrapper;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Deletes a person
 *
 * @param {string} personId
 *
 * @returns {IResponseWrapper<IPersonResponse>} response
 *
 * @throws {Error} error
 */
export const remove = async (
  personId: string
): Promise<IResponseWrapper<null>> => {
  try {
    const headersConfig = {
      headers: {},
    };

    const apiResponse = await axios.delete(
      `${configUtils.server.peopleApiBaseUrl}/${people}/Remove/${personId}`,
      headersConfig
    );

    // Build our response
    const responseWrapper = {} as IResponseWrapper<null>;
    responseWrapper.data = apiResponse.data.data;
    responseWrapper.statusCode = HttpStatusCode.Ok;
    responseWrapper.message = "";
    responseWrapper.success = true;

    return responseWrapper;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
