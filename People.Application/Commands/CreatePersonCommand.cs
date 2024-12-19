using MediatR;
using Microsoft.Extensions.Logging;
using People.Application.DTOs;
using People.Application.Interfaces;
using People.Domain.Events;

namespace People.Application.Commands;

public record CreatePersonCommand(CreatePersonRequest Person) : IRequest<PersonResponse>;

/// <summary>
/// Handles the command to create a new person.
/// <para>Since commands are intended to modify the state, we implement scricter error handling</para>
/// </summary>
/// <param name="personRepository"></param>
/// <param name="_logger"></param>
public class CreatePersonCommandHandler(IPersonRepository personRepository, ILogger<CreatePersonCommand> _logger, IMediator _mediator)
    : IRequestHandler<CreatePersonCommand, PersonResponse>
{
    public async Task<PersonResponse> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogWarning($"Attempt to create a person: {request.Person.FirstName} {request.Person.LastName}");

            var newPerson = await personRepository.Create(request.Person);

            _logger.LogInformation($"Person created successfully: {newPerson.Id}");

            // Handle domain event when a new person is created
            await _mediator.Publish(new PersonCreateEvent(newPerson.Id, newPerson.DateCreated));

            return newPerson;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while creating the person.");
            throw; // Rethrow the exception after logging
        }
    }
}