using Microsoft.Extensions.DependencyInjection;
using People.Infrastructure.Persistance;
using People.Domain.Interfaces;
using People.Infrastructure.Repositories;

namespace People.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Allows us to use the DB Context in the Presentation layer using Dependency Injection.
    /// </summary>
    public static void AddInfrastructureDI(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>();

        services.AddScoped<IPersonRepository, PersonRepository>();
    }
}