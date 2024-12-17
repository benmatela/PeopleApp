using Microsoft.Extensions.DependencyInjection;
using People.Infrastructure.Persistance;
using People.Infrastructure.Repositories;
using People.Application.Interfaces;

namespace People.Infrastructure.Extensions;

/// <summary>
/// Adds Infrastructure layer services using dependencies
/// <para>Allows us to use things like DB Context in other layers using Dependency Injection.</para>
/// </summary>
public static class DependencyInjection
{
    public static void AddInfrastructureDI(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>();

        services.AddScoped<IPersonRepository, PersonRepository>();
    }
}