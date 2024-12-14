using System.Net;

namespace People.Presentation.Server.Models;

/// <summary>
/// Used to standardize all our API responses for all clients
/// </summary>
public class ResponseWrapper<T>
{
    public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; } = true;
    public T? Data { get; set; }
    public Exception? Exception { get; set; }

    public ResponseWrapper()
    {
    }
}