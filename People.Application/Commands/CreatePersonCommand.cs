using MediatR;
using People.Domain.Entities;
using People.Domain.Interfaces;

namespace People.Application.Commands;

public record CreatePersonCommand(Person Person) : IRequest<Person>;

/// <summary>
/// Handles the command to create a new person.
/// </summary>
public class CreatePersonCommandHandler(IPersonRepository personRepository)
    : IRequestHandler<CreatePersonCommand, Person>
{
    public async Task<Person> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
    {
        return await personRepository.Create(request.Person);
    }
}