using Microsoft.Extensions.DependencyInjection;
using People.Infrastructure.Persistance;
using People.Infrastructure.Repositories;
using People.Domain.Interfaces;

namespace People.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Allows us to use the DB Context in the Presentation layer.
    /// </summary>
    public static void AddInfrastructureDI(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>();

        services.AddScoped<IPersonRepository, PersonRepository>();
    }
}