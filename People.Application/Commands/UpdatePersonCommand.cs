using MediatR;
using People.Application.DTOs;
using People.Application.Repositories;

namespace People.Application.Commands;

public record UpdatePersonCommand(Guid PersonId, UpdatePersonRequest Person) : IRequest<bool>;

/// <summary>
/// Handles the command to update an existing person.
/// </summary>
public class UpdatePersonCommandHandler(IPersonRepository personRepository)
    : IRequestHandler<UpdatePersonCommand, bool>
{
    public async Task<bool> Handle(UpdatePersonCommand request, CancellationToken cancellationToken)
    {
        return await personRepository.Update(request.PersonId, request.Person);
    }
}