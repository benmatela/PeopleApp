using People.Application.DTOs;

namespace People.Application.Repositories;

/// <summary>
/// Person Repository
/// <para>Person specific repositories</para> 
/// </summary>
public interface IPersonRepository : IBaseRepository<PersonResponse>
{
    Task<PersonResponse> Create(CreatePersonRequest request);
    Task<bool> Update(Guid personId, UpdatePersonRequest request);
}