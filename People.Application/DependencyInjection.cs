using System.Reflection;
using MediatR;
using MediatR.NotificationPublishers;
using Microsoft.Extensions.DependencyInjection;
using People.Domain.Events;

namespace People.Application.Extensions;

/// <summary>
/// Adds Application layer services using dependencies
/// <para>Allows us to use things like MediatR in other layers using Dependency Injection.</para>
/// </summary>
public static class DependencyInjection
{
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
        //Event handling
        services.AddScoped<INotificationHandler<PersonCreateEvent>, PersonCreateEventHandler>();
    }
}