using MediatR;
using Microsoft.Extensions.Logging;
using People.Application.Interfaces;

namespace People.Application.Commands;

public record RemovePersonCommand(Guid PersonId) : IRequest<bool>;

/// <summary>
/// Handles the command to remove/delete an existing person.
/// </summary>
public class RemovePersonCommandHandler(IPersonRepository personRepository, ILogger<CreatePersonCommand> _logger)
    : IRequestHandler<RemovePersonCommand, bool>
{
    public async Task<bool> Handle(RemovePersonCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogWarning($"Attempt to delete a person: {request}");

            var deletedPerson = await personRepository.Remove(request.PersonId);
            if (!deletedPerson)
            {
                string errorMessage = $"There was an error while deleting a person: {request.PersonId}";
                _logger.LogInformation(errorMessage);
                throw new Exception(errorMessage); // bubbleup the error 
            }
;
            _logger.LogInformation($"Person deleted successfully: {request.PersonId}");

            return deletedPerson;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while deleting the person.");
            throw; // Rethrow the exception after logging
        }
    }
}