using MediatR;
using People.Application.DTOs;
using People.Application.Interfaces;

namespace People.Application.Queries;

public record GetAllPeopleQuery() : IRequest<IEnumerable<PersonResponse>>;

/// <summary>
/// Handles the query to get all existing people.
/// 
/// <para>Since queries are intended to return data without side effects or modifying the state, 
/// we are not too strict with error handling</para>
/// </summary>
/// <param name="personRepository"></param>
public class GetAllPeopleQueryHandler(IPersonRepository personRepository)
    : IRequestHandler<GetAllPeopleQuery, IEnumerable<PersonResponse>>
{
    public async Task<IEnumerable<PersonResponse>> Handle(GetAllPeopleQuery request, CancellationToken cancellationToken)
    {
        return await personRepository.GetAll();
    }
}