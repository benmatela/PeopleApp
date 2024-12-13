using System.Net;

namespace People.Presentation.Server.Models;

/// <summary>
/// Response Wrapper DTO - Used to standardize all our responses for all clients
/// </summary>
public class ResponseWrapperDTO<T>
{
    public HttpStatusCode StatusCode { get; set; }
    public string Message { get; set; }
    public bool Success { get; set; }
    public T? Data { get; set; }
    public Exception? Exception { get; set; }

    public ResponseWrapperDTO()
    {
        Success = true;
        Message = "";
        StatusCode = HttpStatusCode.OK;
    }
}