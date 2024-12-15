using MediatR;
using People.Application.DTOs;
using People.Application.Interfaces;

namespace People.Application.Commands;

public record UpdatePersonCommand(Guid PersonId, UpdatePersonRequest Person) : IRequest<PersonResponse>;

/// <summary>
/// Handles the command to update an existing person.
/// </summary>
public class UpdatePersonCommandHandler(IPersonRepository personRepository)
    : IRequestHandler<UpdatePersonCommand, PersonResponse>
{
    public async Task<PersonResponse> Handle(UpdatePersonCommand request, CancellationToken cancellationToken)
    {
        return await personRepository.Update(request.PersonId, request.Person);
    }
}