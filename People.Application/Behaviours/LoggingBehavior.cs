using MediatR;
using Microsoft.Extensions.Logging;

/// <summary>
/// A behavior can act as a middleware that wraps around all the requests to catch and 
/// log exceptions before they propagate further.
/// </summary>
/// <typeparam name="TRequest"></typeparam>
/// <typeparam name="TResponse"></typeparam>
public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;

    public LoggingBehavior(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }

    public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
    {
        try
        {
            _logger.LogInformation($"Handling request of type {typeof(TRequest).Name} with data: {request}");

            var response = await next();

            _logger.LogInformation($"Successfully handled request of type {typeof(TRequest).Name}");

            return response;
        }
        catch (Exception ex)
        {
            _logger.LogInformation($"{ex} An error occurred while handling request of type {typeof(TRequest).Name}");
            throw;  // Rethrow the exception after logging
        }
    }

    public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}