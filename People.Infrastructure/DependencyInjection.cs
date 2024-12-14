using Microsoft.Extensions.DependencyInjection;
using People.Infrastructure.Persistance;
using People.Infrastructure.Repositories;
using People.Application.Repositories;

namespace People.Infrastructure.Extensions;

public static class DependencyInjection
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