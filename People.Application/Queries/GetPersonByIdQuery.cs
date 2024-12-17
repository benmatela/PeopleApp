using MediatR;
using People.Application.DTOs;
using People.Application.Interfaces;

namespace People.Application.Queries;

public record GetPersonByIdQuery(Guid Guid) : IRequest<PersonResponse>;

/// <summary>
/// Handles the query to get a single person by ID 
/// <para>Since queries are intended to return data without side effects or modifying the state, 
/// we are not too strict with error handling</para>
/// </summary>
/// <param name="personRepository"></param>
public class GetPersonByIdQueryHandler(IPersonRepository personRepository)
    : IRequestHandler<GetPersonByIdQuery, PersonResponse>
{
    public async Task<PersonResponse> Handle(GetPersonByIdQuery request, CancellationToken cancellationToken)
    {
        return await personRepository.Get(request.Guid);
    }
}