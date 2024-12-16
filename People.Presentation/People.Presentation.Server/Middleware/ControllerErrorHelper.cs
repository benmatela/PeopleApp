using Microsoft.AspNetCore.Mvc;
using People.Application.DTOs;
using People.Presentation.Server.Models;

namespace People.Presentation.Middleware;

public static class ControllerErrorHelper
{
    /// <summary>
    /// Returns the default caught API error
    /// 
    /// Build our response
    /// This is the default response when all else fails
    /// 
    /// </summary>
    public static ObjectResult HandleError(
        Exception e,
        bool success = false,
        int statusCodes = StatusCodes.Status500InternalServerError)
    {
        // Build our response
        var responseWrapper = new ResponseWrapper<object>();
        responseWrapper.Exception = e;
        responseWrapper.Message = e.Message;
        responseWrapper.Success = success;
        responseWrapper.StatusCode = statusCodes;

        return new ObjectResult(responseWrapper)
        {
            StatusCode = responseWrapper.StatusCode,
        };
    }
}