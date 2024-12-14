using MediatR;
using People.Application.DTOs;
using People.Application.Interfaces;

namespace People.Application.Queries;

public record GetAllPeopleQuery() : IRequest<IEnumerable<PersonResponse>>;

/// <summary>
/// Handles the query to get all existing people.
/// </summary>
public class GetAllPeopleQueryHandler(IPersonRepository personRepository)
    : IRequestHandler<GetAllPeopleQuery, IEnumerable<PersonResponse>>
{
    public async Task<IEnumerable<PersonResponse>> Handle(GetAllPeopleQuery request, CancellationToken cancellationToken)
    {
        return await personRepository.GetAll();
    }
}