using MediatR;
using People.Domain.Entities;
using People.Domain.Interfaces;

namespace People.Application.Queries;

public record GetPersonByIdQuery(Guid Guid) : IRequest<Person>;

/// <summary>
/// Handles the query to get a single existing person.
/// </summary>
public class GetPersonByIdQueryHandler(IPersonRepository personRepository)
    : IRequestHandler<GetPersonByIdQuery, Person>
{
    public async Task<Person> Handle(GetPersonByIdQuery request, CancellationToken cancellationToken)
    {
        return await personRepository.Get(request.Guid);
    }
}