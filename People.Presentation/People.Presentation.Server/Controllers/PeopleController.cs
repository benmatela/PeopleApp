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

        [HttpGet("{personId}")]
        [Route("Get")]
        public async Task<IActionResult> Get([FromRoute] Guid personId)
        {
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
            var result = await sender.Send(new GetAllPeopleQuery());
            return Ok(result);
        }

        [HttpPut("{personId}")]
        [Route("Update")]
        public async Task<IActionResult> Update([FromRoute] Guid personId, [FromBody] Person person)
        {
            var result = await sender.Send(new UpdatePersonCommand(personId, person));
            return Ok(result);
        }

        [HttpDelete("{personId}")]
        [Route("Remove")]
        public async Task<IActionResult> Remove([FromRoute] Guid personId)
        {
            var result = await sender.Send(new RemovePersonCommand(personId));
            return Ok(result);
        }
    }
}
