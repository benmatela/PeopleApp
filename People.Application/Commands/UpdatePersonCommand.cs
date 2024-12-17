using MediatR;
using Microsoft.Extensions.Logging;
using People.Application.DTOs;
using People.Application.Interfaces;

namespace People.Application.Commands;

public record UpdatePersonCommand(Guid PersonId, UpdatePersonRequest Person) : IRequest<bool>;

/// <summary>
/// Handles the command to update a single person.
/// <para>Since commands are intended to modify the state, we implement scrictrer error handling</para>
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
            _logger.LogWarning($"Attempt to update a person: {request.Person.FirstName} {request.Person.LastName}");

            var updatedPerson = await personRepository.Update(request.PersonId, request.Person);
            if (!updatedPerson)
            {
                string errorMessage = $"There was an error while updating a person: {request.PersonId}";
                _logger.LogInformation(errorMessage);
                throw new Exception(errorMessage); // bubbleup the error 
            }
;
            _logger.LogInformation($"Person updated successfully: {request.PersonId}");

            return updatedPerson;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while updating the person.");
            throw; // Rethrow the exception after logging
        }
    }
}