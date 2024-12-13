namespace People.Presentation.Server.Extensions;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Allows us to use the MediatR in the Presentation layer using Dependency Injection.
    /// </summary>
    public static void AddApplicationDI(this IServiceCollection services)
    {
        services.AddMediatR(cf => cf.RegisterServicesFromAssembly(typeof(Program).Assembly));
    }
}