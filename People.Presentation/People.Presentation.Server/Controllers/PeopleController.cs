using System.Net;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using People.Application.Commands;
using People.Domain.Entities;
using People.Presentation.Server.Models;

namespace People.Presentation.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PeopleController(ISender sender) : ControllerBase
    {
        public string notFoundMessage = "Item not found.";

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

        [HttpPost]
        [Route("Remove")]
        public async Task<IActionResult> Remove([FromBody] Person person)
        {
            var responseWrapper = new ResponseWrapperDTO<Person>();
            try
            {
                var result = await sender.Send(new CreatePersonCommand(person));
                if (result is null)
                {
                    responseWrapper.StatusCode = HttpStatusCode.NotFound;
                    responseWrapper.Message = notFoundMessage;
                    responseWrapper.Success = false;

                    return NotFound(responseWrapper);
                }

                responseWrapper.Data = result;

                return Ok(responseWrapper);
            }
            catch (Exception e)
            {
                responseWrapper.Exception = e;
                responseWrapper.Message = e.Message;
                responseWrapper.Success = false;
                responseWrapper.StatusCode = HttpStatusCode.InternalServerError;

                return Ok(responseWrapper);
            }
        }
    }
}
