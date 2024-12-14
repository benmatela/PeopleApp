namespace People.Application.Repositories;

/// <summary>
/// Generic Base Repository
/// <para>Groups common logic for all repositories</para> 
/// </summary>
public interface IBaseRepository<T> where T: class
{
    Task<bool> Remove(Guid id);
    Task<IEnumerable<T>> GetAll();
    Task<T> Get(Guid id);
}
