using MediatR;
using People.Domain.Entities;
using People.Domain.Interfaces;

namespace People.Application.Commands;

public record UpdatePersonCommand(Guid PersonId, Person Person) : IRequest<Person>;

/// <summary>
/// Handles the command to update an existing person.
/// </summary>
public class UpdatePersonCommandHandler(IPersonRepository personRepository)
    : IRequestHandler<UpdatePersonCommand, Person>
{
    public async Task<Person> Handle(UpdatePersonCommand request, CancellationToken cancellationToken)
    {
        return await personRepository.Update(request.PersonId, request.Person);
    }
}