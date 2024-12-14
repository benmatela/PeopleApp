/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { HttpStatusCode } from "axios";
import { IResponseWrapper } from "../models/response-wrapper.model";
import { peopleApiBaseUrl } from "../utils/config.utils";
import { people } from "../constants";
import { IPerson, IPersonResponse } from "../models/person.model";

/**
 * Creates a new person
 *
 * @param {IPersonRequest} request
 *
 * @returns {IResponseWrapper<IPersonResponse>} response
 */
export const create = async (
  request: IPerson
): Promise<IResponseWrapper<IPersonResponse>> => {
  try {
    const headersConfig = {
      headers: {},
    };

    const apiResponse = await axios.post(
      `${peopleApiBaseUrl}/${people}/Create`,
      request,
      headersConfig
    );

    // Build our response
    const responseWrapper = {} as IResponseWrapper<IPersonResponse>;
    responseWrapper.data = apiResponse.data;
    responseWrapper.statusCode = HttpStatusCode.Ok;
    responseWrapper.message = "";
    responseWrapper.success = true;

    return responseWrapper;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
