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
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([FromBody] Person person)
        {
            try
            {
                var result = await sender.Send(new CreatePersonCommand(person));
                // var responseWrapper = new ResponseWrapperDTO<Person>(HttpStatusCode.OK, "", true, result);

                Console.WriteLine("Response: {0}", result);

                return Ok(result);
            }
            catch (Exception e)
            {
                // var responseWrapper = new ResponseWrapperDTO<Person>(HttpStatusCode.InternalServerError, e.Message, false, null);

                return Ok("Failed");
            }
        }
    }
}
