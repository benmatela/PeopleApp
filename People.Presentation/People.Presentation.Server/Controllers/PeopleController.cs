using System.Net;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using People.Application.Commands;
using People.Application.DTOs;
using People.Application.Helpers;
using People.Application.Queries;
using People.Presentation.Server.Models;

namespace People.Presentation.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PeopleController(ISender sender) : ControllerBase
    {
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] CreatePersonRequest request)
        {
            var responseWrapper = new ResponseWrapper<PersonResponse>();
            try
            {
                var result = await sender.Send(new CreatePersonCommand(request));

                // Build our response
                responseWrapper.Data = result;
                responseWrapper.Data.Age = DateHelpers.GetAge(request.DateOfBirth);

                return Ok(responseWrapper);
            }
            catch (Exception e)
            {
                // Build our response
                responseWrapper.Exception = e;
                responseWrapper.Message = e.Message;
                responseWrapper.Success = false;
                responseWrapper.StatusCode = HttpStatusCode.InternalServerError;

                return Ok(responseWrapper);
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
                if (result is null)
                {
                    // Build our response
                    responseWrapper.Success = false;
                    responseWrapper.Message = "Item not found.";
                    responseWrapper.StatusCode = HttpStatusCode.NotFound;

                    return Ok(responseWrapper);
                }
                else
                {
                    // Build our response
                    responseWrapper.Data = result;
                    responseWrapper.Data.Age = DateHelpers.GetAge(result.DateOfBirth);

                    return Ok(responseWrapper);
                }

            }
            catch (Exception e)
            {
                // Build our response
                responseWrapper.Exception = e;
                responseWrapper.Message = e.Message;
                responseWrapper.Success = false;
                responseWrapper.StatusCode = HttpStatusCode.InternalServerError;

                return Ok(responseWrapper);
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
                if (result.Count() == 0)
                {
                    // Build our response
                    responseWrapper.Success = false;
                    responseWrapper.Message = "Items not found.";
                    responseWrapper.StatusCode = HttpStatusCode.NotFound;
                }

                // Build our response
                responseWrapper.Data = result;

                return Ok(responseWrapper);
            }
            catch (Exception e)
            {
                // Build our response
                responseWrapper.Exception = e;
                responseWrapper.Message = e.Message;
                responseWrapper.Success = false;
                responseWrapper.StatusCode = HttpStatusCode.InternalServerError;

                return Ok(responseWrapper);
            }
        }

        [HttpPut]
        [Route("Update/{personId}")]
        public async Task<IActionResult> Update([FromRoute] Guid personId, [FromBody] UpdatePersonRequest person)
        {
            var responseWrapper = new ResponseWrapper<PersonResponse>();
            try
            {
                var result = await sender.Send(new UpdatePersonCommand(personId, person));

                // Build our response
                responseWrapper.Success = true;
                responseWrapper.Message = "";
                responseWrapper.StatusCode = HttpStatusCode.OK;
                responseWrapper.Data = result;
                responseWrapper.Data.Age = DateHelpers.GetAge(result.DateOfBirth);

                return Ok(responseWrapper);
            }
            catch (Exception e)
            {
                // Build our response
                responseWrapper.Exception = e;
                responseWrapper.Message = e.Message;
                responseWrapper.Success = false;
                responseWrapper.StatusCode = HttpStatusCode.InternalServerError;

                return Ok(responseWrapper);
            }
        }

        [HttpDelete]
        [Route("Remove/{personId}")]
        public async Task<IActionResult> Remove([FromRoute] Guid personId)
        {
            var responseWrapper = new ResponseWrapper<PersonResponse>();
            try
            {
                var result = await sender.Send(new RemovePersonCommand(personId));

                // Build our response
                responseWrapper.Message = result ? "" : "Item not deleted.";
                responseWrapper.StatusCode = result ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
                responseWrapper.Success = result;

                return Ok(responseWrapper);
            }
            catch (Exception e)
            {
                // Build our response
                responseWrapper.Exception = e;
                responseWrapper.Message = e.Message;
                responseWrapper.Success = false;
                responseWrapper.StatusCode = HttpStatusCode.InternalServerError;

                return Ok(responseWrapper);
            }
        }

         [HttpGet]
        [Route("Search")]
        public async Task<ActionResult<IEnumerable<PersonResponse>>> SearchPeople(
            [FromQuery] string firstName,
            [FromQuery] string lastName)
        {
            var result = await _peopleService.SearchPeopleAsync(firstName, lastName);
            if (result == null || result.Count == 0)
            {
                return NotFound("No people found with the given criteria.");
            }
            return Ok(result);
        }
    }
}
