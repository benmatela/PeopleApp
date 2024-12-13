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
        public async Task<IActionResult> Create([FromBody] Person person)
        {
            try
            {
                var result = await sender.Send(new CreatePersonCommand(person));
                var responseWrapper = new ResponseWrapperDTO<Person>(HttpStatusCode.OK, "", true, result);

                return Ok(responseWrapper);
            }
            catch (Exception e)
            {
                // Logging
                var responseWrapper = new ResponseWrapperDTO<Person>(HttpStatusCode.OK, "", true, null);

                return Ok(responseWrapper);
            }
        }
    }
}
