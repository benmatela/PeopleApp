using MediatR;
using People.Application.DTOs;
using People.Application.Interfaces;

namespace People.Application.Queries;

public record SearchPersonByFirstAndLastNameQuery(SearchPersonRequest Person, CancellationToken cancellationToken) : IRequest<IEnumerable<PersonResponse>>;

/// <summary>
/// Handles the query to get users by specified keys.
/// 
/// <para>This also uses a CancellationToken which is the structure used by 
/// listeners to monitor the token’s current state.</para>
/// </summary>
public class SearchPersonByFirstAndLastNameQueryHandler(IPersonRepository personRepository)
    : IRequestHandler<SearchPersonByFirstAndLastNameQuery, IEnumerable<PersonResponse>>
{
    public async Task<IEnumerable<PersonResponse>> Handle(SearchPersonByFirstAndLastNameQuery request, CancellationToken cancellationToken)
    {
        return await personRepository.Search(request.Person, request.cancellationToken);
    }
}