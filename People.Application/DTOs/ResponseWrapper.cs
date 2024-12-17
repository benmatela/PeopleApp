
namespace People.Application.DTOs;

/// <summary>
/// Used to standardize all our API responses for all clients
/// </summary>
public class ResponseWrapper<T>
{
    // Allows us to use the already defined status codes instead of
    // us writing new codes
    public int StatusCode { get; set; } = 200;
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; } = true;
    public T? Data { get; set; }
    public Exception? Exception { get; set; }

    public ResponseWrapper()
    {
    }
}