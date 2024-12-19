using MediatR;
using Microsoft.Extensions.Logging;
using People.Application.DTOs;
using People.Application.Interfaces;

namespace People.Application.Commands;

public record UpdatePersonCommand(Guid PersonId, UpdatePersonRequest Person) : IRequest<bool>;

/// <summary>
/// Handles the command to update a single person.
/// <para>Since commands are intended to modify the state, we implement scricter error handling</para>
/// </summary>
/// <param name="personRepository"></param>
/// <param name="_logger"></param>
public class UpdatePersonCommandHandler(IPersonRepository personRepository, ILogger<CreatePersonCommand> _logger)
    : IRequestHandler<UpdatePersonCommand, bool>
{
    public async Task<bool> Handle(UpdatePersonCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogWarning($"Attempt to update a person: {request.Person} => {request.Person.FirstName} {request.Person.LastName}");

            var isSuccess = await personRepository.Update(request.PersonId, request.Person);
            if (!isSuccess)
            {
                string errorMessage = $"There was an error while updating a person: {request.PersonId}";
                _logger.LogInformation(errorMessage);
            }
;
            _logger.LogInformation($"Person updated successfully: {request.PersonId}");

            return isSuccess;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while updating the person.");
            throw; // Rethrow the exception after logging
        }
    }
}