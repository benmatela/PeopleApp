using MediatR;
using Microsoft.Extensions.Logging;
using People.Application.Interfaces;
using People.Domain.Events;

namespace People.Application.Commands;

public record RemovePersonCommand(Guid PersonId) : IRequest<bool>;

/// <summary>
/// Handles the command to delete a single person.
/// <para>Since commands are intended to modify the state, we implement scricter error handling</para>
/// </summary>
/// <param name="personRepository"></param>
/// <param name="_logger"></param>
public class RemovePersonCommandHandler(IPersonRepository personRepository, ILogger<CreatePersonCommand> _logger, IMediator _mediator)
    : IRequestHandler<RemovePersonCommand, bool>
{
    public async Task<bool> Handle(RemovePersonCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogWarning($"Attempt to delete a person: {request.PersonId}");

            var success = await personRepository.Remove(request.PersonId);
            if (!success)
            {
                string errorMessage = $"There was an error while deleting a person: {request.PersonId}";
                _logger.LogInformation(errorMessage);
            }
;
            _logger.LogInformation($"Person deleted successfully: {request.PersonId}");

            // Handle domain event when a person is removed
            await _mediator.Publish(new PersonRemoveEvent(request.PersonId, new DateTime()));

            return success;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while deleting the person.");
            throw; // Rethrow the exception after logging
        }
    }
}