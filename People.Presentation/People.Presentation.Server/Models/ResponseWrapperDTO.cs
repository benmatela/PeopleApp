using System.Net;

namespace People.Presentation.Server.Models;

/// <summary>
/// Response Wrapper - Used to standardize all our responses
/// </summary>
public class ResponseWrapperDTO<T> where T : class
{
    private HttpStatusCode _statusCode;
    private string _message;
    private bool _success;
    private T? _data;

    public ResponseWrapperDTO(HttpStatusCode StatusCode, string Message, bool Success, T? Data)
    {
        _statusCode = StatusCode;
        _message = Message;
        _success = Success;
        _data = Data;
    }
}