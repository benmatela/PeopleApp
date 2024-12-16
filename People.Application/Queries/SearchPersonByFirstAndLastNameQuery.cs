using MediatR;
using People.Application.DTOs;
using People.Application.Interfaces;

namespace People.Application.Queries;

/// <summary>
/// Handles the query to get users by specified keys.
/// 
/// <para>This also uses a CancellationToken which is the structure used by 
/// listeners to monitor the token’s current state.</para>
/// </summary>
public record SearchPersonByFirstAndLastNameQuery(SearchPersonRequest Person, CancellationToken cancellationToken) : IRequest<IEnumerable<PersonResponse>>;

/// <summary>
/// Handles the search query to find person(s) by first name and last name.
///  <para>This also uses a CancellationToken which is the structure used by 
/// listeners to monitor the token’s current state.</para>
/// <para>Since commands are intended to modify the state, we implement scrictrer error handling</para>
/// </summary>
/// <param name="personRepository"></param>
public class SearchPersonByFirstAndLastNameQueryHandler(IPersonRepository personRepository)
    : IRequestHandler<SearchPersonByFirstAndLastNameQuery, IEnumerable<PersonResponse>>
{
    public async Task<IEnumerable<PersonResponse>> Handle(SearchPersonByFirstAndLastNameQuery request, CancellationToken cancellationToken)
    {
        return await personRepository.Search(request.Person, request.cancellationToken);
    }
}