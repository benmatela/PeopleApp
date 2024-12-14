/**
 * Response Wrapper
 * 
 * Used to standardize all API responses
 */
export interface IResponseWrapper<T> {
    statusCode: number;
    message: string;
    success: boolean;
    data: T;
    exception: unknown;
}