namespace People.Application.Interfaces;

/// <summary>
/// Groups common logic for all repositories
/// </summary>
public interface IBaseRepository<TResponse, TSearch> where TResponse : class where TSearch : class
{
    Task<bool> Remove(Guid id);
    Task<IEnumerable<TResponse>> GetAll();
    Task<TResponse> Get(Guid id);
    Task<IEnumerable<TResponse>> Search(TSearch searchByRequest, CancellationToken cancellationToken);
}
