using System.Reflection;
using MediatR;
using MediatR.NotificationPublishers;
using Microsoft.Extensions.DependencyInjection;

namespace People.Application.Extensions;

public static class DependencyInjection
{
    /// <summary>
    /// Allows us to use the MediatR in the Presentation layer using Dependency Injection.
    /// </summary>
    public static void AddApplicationDI(this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
           {
               cfg.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly);
               cfg.NotificationPublisher = new TaskWhenAllPublisher();
           });
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        // Register Logging Behavior for all requests
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
    }
}