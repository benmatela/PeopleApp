using System.Net;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using People.Application.Commands;
using People.Application.Queries;
using People.Domain.Entities;
using People.Presentation.Server.Models;

namespace People.Presentation.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PeopleController(ISender sender) : ControllerBase
    {
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] Person person)
        {
            var responseWrapper = new ResponseWrapperDTO<Person>();
            try
            {
                var result = await sender.Send(new CreatePersonCommand(person));

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

        [HttpGet]
        [Route("Get/{personId}")]
        public async Task<IActionResult> Get([FromRoute] Guid personId)
        {
            Console.WriteLine("Input: {0}", personId);
            var responseWrapper = new ResponseWrapperDTO<Person>();
            try
            {
                var result = await sender.Send(new GetPersonByIdQuery(personId));
                if (result is null)
                {
                    // Build our response
                    responseWrapper.Success = false;
                    responseWrapper.Message = "Item not found.";
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

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var responseWrapper = new ResponseWrapperDTO<IEnumerable<Person>>();
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
        [Route("Update")]
        public async Task<IActionResult> Update([FromRoute] Guid personId, [FromBody] Person person)
        {
            var responseWrapper = new ResponseWrapperDTO<Person>();
            try
            {
                var result = await sender.Send(new UpdatePersonCommand(personId, person));
                if (result is null)
                {
                    // Build our response
                    responseWrapper.Success = false;
                    responseWrapper.Message = "Item not found.";
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

        [HttpDelete]
        [Route("Remove")]
        public async Task<IActionResult> Remove([FromRoute] Guid personId)
        {
            var responseWrapper = new ResponseWrapperDTO<bool>();
            try
            {
                var result = await sender.Send(new RemovePersonCommand(personId));
               
                // Build our response
                responseWrapper.Data = result;
                responseWrapper.Message = result ? "" : "Item not deleted.";
                responseWrapper.StatusCode = result ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
                responseWrapper.Success = result ? true : false;

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
    }
}
