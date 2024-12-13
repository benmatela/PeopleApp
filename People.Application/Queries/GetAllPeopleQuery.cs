using MediatR;
using People.Domain.Entities;
using People.Domain.Interfaces;

namespace People.Application.Queries;

public record GetAllPeopleQuery() : IRequest<IEnumerable<Person>>;

/// <summary>
/// Handles the query to get all existing people.
/// </summary>
public class GetAllPeopleQueryHandler(IPersonRepository personRepository)
    : IRequestHandler<GetAllPeopleQuery, IEnumerable<Person>>
{
    public async Task<IEnumerable<Person>> Handle(GetAllPeopleQuery request, CancellationToken cancellationToken)
    {
        return await personRepository.GetAll();
    }
}