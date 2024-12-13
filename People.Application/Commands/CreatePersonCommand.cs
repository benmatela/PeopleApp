using MediatR;
using People.Domain.Entities;
using People.Infrastructure.Repositories;

namespace People.Application.Commands;

public record CreatePersonCommand(Person Person) : IRequest<Person>;

public class AddEmployeeCommandHandler(PersonRepository personRepository)
    : IRequestHandler<CreatePersonCommand, Person>
{
    public async Task<Person> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
    {
        return await personRepository.Create(request.Person);
    }
}