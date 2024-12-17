using People.Application.DTOs;

namespace People.Application.Interfaces;

/// <summary>
/// Person specific repositories
/// <param>This is more explicit in terms of the models as compared to gereric repository</param>
/// </summary>
public interface IPersonRepository : IBaseRepository<PersonResponse, SearchPersonRequest>
{
    Task<PersonResponse> Create(CreatePersonRequest request);
    Task<bool> Update(Guid personId, UpdatePersonRequest request);
}