using People.Application.DTOs;

namespace People.Application.Interfaces;

/// <summary>
/// Person specific repositories
/// </summary>
public interface IPersonRepository : IBaseRepository<PersonResponse>
{
    Task<PersonResponse> Create(CreatePersonRequest request);
    Task<bool> Update(Guid personId, UpdatePersonRequest request);
}