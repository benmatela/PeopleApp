using MediatR;
using People.Domain.Entities;
using People.Domain.Interfaces;

namespace People.Application.Commands;

public record CreatePersonCommand(Person Person) : IRequest<Person>;

/// <summary>
/// An action or request to change the state of the system.
/// </summary>
public class AddEmployeeCommandHandler(IPersonRepository personRepository)
    : IRequestHandler<CreatePersonCommand, Person>
{
    public async Task<Person> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
    {
        return await personRepository.Create(request.Person);
    }
}