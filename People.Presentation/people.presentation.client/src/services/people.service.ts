/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { HttpStatusCode } from "axios";
import { ICreatePersonRequest, IPersonResponse } from "../models/person.model";
import { IResponseWrapper } from "../models/response-wrapper.model";
import { peopleApiBaseUrl } from "../utils/config.utils";
import { people } from "../constants";

/**
 * Creates a new person
 *
 * @param {ICreatePersonRequest} request
 *
 * @returns {IResponseWrapper<IPersonResponse>} response
 */
export const create = async (
  request: ICreatePersonRequest
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
