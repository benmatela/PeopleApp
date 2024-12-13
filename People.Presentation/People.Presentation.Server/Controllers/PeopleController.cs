using MediatR;
using Microsoft.AspNetCore.Mvc;
using People.Application.Commands;
using People.Domain.Entities;

namespace People.Presentation.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PeopleController(ISender sender) : ControllerBase
    {
        [HttpGet("")]
        public async Task<IActionResult> Create([FromBody] Person person)
        {
            var result = await sender.Send(new CreatePersonCommand(person));
            return Ok(result);
        }
    }
}
