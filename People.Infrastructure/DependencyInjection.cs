using Microsoft.Extensions.DependencyInjection;
using People.Infrastructure.Persistance;
using People.Infrastructure.Repositories;
using People.Application.Interfaces;
using People.Infrastructure.Services.PubSub;
using StackExchange.Redis;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace People.Infrastructure.Extensions;

/// <summary>
/// Adds Infrastructure layer services using dependencies
/// <para>Allows us to use things like DB Context in other layers using Dependency Injection.</para>
/// </summary>
public static class DependencyInjection
{
    public static void AddInfrastructureDI(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>();

        services.AddScoped<IPersonRepository, PersonRepository>();

        // Register Redis connection (make sure Redis is running)
        // abortConnect: This is helpful if you want to continue retrying the connection when Redis is not available immediately (for example, during startup).
        services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect("redis:6379,abortConnect=false")); // get from .env
        // Register Event Publisher (Redis)
        services.AddSingleton<IEventPublisher, RedisEventPublisher>();
        // Register the Use Case
        services.AddScoped<PersonRepository>();

        // MSSQL DB
        // Get the connection string
        // string connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new Exception("Connection string is not initialized.");
        // Console.WriteLine("connectionString", connectionString);
        string connectionString = "Server=localhost,1433;Database=people-db;User Id=sa;Password=YourStrong!Passw0rd;Encrypt=False;TrustServerCertificate=True;";
       
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString));
    }
}