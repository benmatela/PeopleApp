using Microsoft.Extensions.DependencyInjection;
using People.Infrastructure.Persistance;

namespace People.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Allows us to use the DB Context in the API layer.
    /// </summary>
    public static void AddInfrastructure(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>();
    }
}