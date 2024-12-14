namespace People.Application.Interfaces;

/// <summary>
/// Groups common logic for all repositories
/// </summary>
public interface IBaseRepository<T> where T: class
{
    Task<bool> Remove(Guid id);
    Task<IEnumerable<T>> GetAll();
    Task<T> Get(Guid id);
}
