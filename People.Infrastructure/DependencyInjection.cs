using Microsoft.Extensions.DependencyInjection;
using People.Infrastructure.Persistance;
using People.Infrastructure.Repositories;
using People.Application.Interfaces;
using People.Infrastructure.Services.PubSub;
using StackExchange.Redis;
using Microsoft.EntityFrameworkCore;

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

        // Register Redis connection (make sure Redis is running)
        // abortConnect: This is helpful if you want to continue retrying the connection when Redis is not available immediately (for example, during startup).
        string redisConnectionString = Environment.GetEnvironmentVariable("REDIS_CONNECTION_STRING") ?? "";
        services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));
        // Register Event Publisher (Redis)
        services.AddSingleton<IEventPublisher, RedisEventPublisher>();
        // Register the Use Case
        services.AddScoped<PersonRepository>();

        // MSSQL DB
        // Get the connection string set in the environment variables in docker-compose.yml
        string mssqlConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") ?? "";
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(mssqlConnectionString));
    }
}