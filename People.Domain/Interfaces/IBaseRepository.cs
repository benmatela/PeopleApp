namespace People.Domain.Interfaces;

/// <summary>
/// Generic Base Repository
/// </summary>
public interface IBaseRepository<T> where T : class
{
    Task<T> Create(T person);
    Task<bool> Remove(Guid personId);
    Task<T> Update(Guid personId, T person);
    Task<IEnumerable<T>> GetAll();
    Task<T> Get(Guid personId);
}
