using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using People.Application.Commands;
using People.Application.DTOs;
using People.Application.Helpers;
using People.Application.Queries;
using People.Presentation.Middleware;
using People.Presentation.Server.Models;

namespace People.Presentation.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PeopleController(ISender sender) : ControllerBase
    {
        public static readonly string RecordsNotFoundMessage = "Record(s) not found.";

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] CreatePersonRequest request)
        {
            var responseWrapper = new ResponseWrapper<PersonResponse>();
            try
            {
                var result = await sender.Send(new CreatePersonCommand(request));

                // Build our response
                responseWrapper.Message = result is not null ? "" : RecordsNotFoundMessage;
                responseWrapper.StatusCode = result is not null ?
                    StatusCodes.Status200OK : StatusCodes.Status404NotFound;
                responseWrapper.Success = result is not null ? true : false;

                // Update the age field for the client
                if (result is not null)
                {
                    responseWrapper.Data = result;
                    responseWrapper.Data.Age = DateHelpers.GetAge(result.DateOfBirth);
                }

                return new ObjectResult(responseWrapper)
                {
                    StatusCode = responseWrapper.StatusCode,
                };
            }
            catch (Exception e)
            {
                return ControllerErrorHelper.HandleError(e);

            }
        }

        [HttpGet]
        [Route("Get/{personId}")]
        public async Task<IActionResult> Get([FromRoute] Guid personId)
        {
            var responseWrapper = new ResponseWrapper<PersonResponse>();
            try
            {
                var result = await sender.Send(new GetPersonByIdQuery(personId));

                // Build our response
                responseWrapper.Message = result is not null ? "" : RecordsNotFoundMessage;
                responseWrapper.StatusCode = result is not null ?
                    StatusCodes.Status200OK : StatusCodes.Status404NotFound;
                responseWrapper.Success = result is not null ? true : false;

                if (result is not null)
                {
                    responseWrapper.Data = result;
                }

                return new ObjectResult(responseWrapper)
                {
                    StatusCode = responseWrapper.StatusCode,
                };
            }
            catch (Exception e)
            {
                // Build our response
                // This is the default response when all else fails
                responseWrapper.Exception = e;
                responseWrapper.Message = e.Message;
                responseWrapper.Success = false;
                responseWrapper.StatusCode = StatusCodes.Status200OK;

                return new ObjectResult(responseWrapper)
                {
                    StatusCode = responseWrapper.StatusCode,
                };
            }
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var responseWrapper = new ResponseWrapper<IEnumerable<PersonResponse>>();
            try
            {
                var result = await sender.Send(new GetAllPeopleQuery());
                // Build our response
                responseWrapper.Message = result.Count() > 0 ? "" : RecordsNotFoundMessage;
                responseWrapper.StatusCode = result.Count() > 0 ?
                    StatusCodes.Status200OK : StatusCodes.Status404NotFound;
                responseWrapper.Success = result.Count() > 0 ? true : false;
                responseWrapper.Data = result;

                return new ObjectResult(responseWrapper)
                {
                    StatusCode = responseWrapper.StatusCode,
                };
            }
            catch (Exception e)
            {
                return ControllerErrorHelper.HandleError(e);

            }
        }

        [HttpPut]
        [Route("Update/{personId}")]
        public async Task<IActionResult> Update(
            [FromRoute] Guid personId,
            [FromBody] UpdatePersonRequest person)
        {
            var responseWrapper = new ResponseWrapper<PersonResponse>();
            try
            {
                var isSuccess = await sender.Send(new UpdatePersonCommand(personId, person));
                if (isSuccess)
                {
                    // Build our response
                    responseWrapper.Message = "";
                    responseWrapper.StatusCode = StatusCodes.Status200OK;
                    responseWrapper.Success = true;
                }
                else
                {
                    // Build our response
                    responseWrapper.Message = "Record not found.";
                    responseWrapper.StatusCode = StatusCodes.Status404NotFound;
                    responseWrapper.Success = false;
                }

                return new ObjectResult(responseWrapper)
                {
                    StatusCode = responseWrapper.StatusCode,
                };
            }
            catch (Exception e)
            {
                return ControllerErrorHelper.HandleError(e);
            }
        }

        [HttpDelete]
        [Route("Remove/{personId}")]
        public async Task<IActionResult> Remove([FromRoute] Guid personId)
        {
            var responseWrapper = new ResponseWrapper<PersonResponse>();
            try
            {
                var isSuccess = await sender.Send(new RemovePersonCommand(personId));
                if (isSuccess)
                {
                    // Build our response
                    responseWrapper.Message = "";
                    responseWrapper.StatusCode = StatusCodes.Status200OK;
                    responseWrapper.Success = true;
                }
                else
                {
                    // Build our response
                    responseWrapper.Message = "Record not found.";
                    responseWrapper.StatusCode = StatusCodes.Status404NotFound;
                    responseWrapper.Success = false;
                }

                return new ObjectResult(responseWrapper)
                {
                    StatusCode = responseWrapper.StatusCode,
                };
            }
            catch (Exception e)
            {
                return ControllerErrorHelper.HandleError(e);
            }
        }

        [HttpGet]
        [Route("Search")]
        public async Task<ActionResult<IEnumerable<PersonResponse>>> SearchPeople(
           [FromQuery] string firstName,
           [FromQuery] string lastName)
        {
            var responseWrapper = new ResponseWrapper<IEnumerable<PersonResponse>>();
            try
            {
                // This is the object responsible for creating a cancellation token and sending a 
                // cancellation request to all copies of that token.
                CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
                // This is the structure used by listeners to monitor the token’s current state.
                CancellationToken token = cancellationTokenSource.Token;

                // Create a DTO for our queries
                var searchQueries = new SearchPersonRequest();
                searchQueries.FirstName = firstName;
                searchQueries.LastName = lastName;

                var result = await sender.Send(new SearchPersonByFirstAndLastNameQuery(searchQueries, token));

                // Build our response
                responseWrapper.Message = result.Count() > 0 ? "" : RecordsNotFoundMessage;
                responseWrapper.StatusCode = result.Count() > 0 ?
                    StatusCodes.Status200OK : StatusCodes.Status404NotFound;
                responseWrapper.Success = result.Count() > 0 ? true : false;
                responseWrapper.Data = result;

                return new ObjectResult(responseWrapper)
                {
                    StatusCode = responseWrapper.StatusCode,
                };
            }
            catch (Exception e)
            {
                return ControllerErrorHelper.HandleError(e);
            }
        }
    }
}
