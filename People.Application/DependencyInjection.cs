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
               cfg.RegisterServicesFromAssembly(typeof(ServiceCollectionExtensions).Assembly);
               cfg.NotificationPublisher = new TaskWhenAllPublisher();
           });
    }
}