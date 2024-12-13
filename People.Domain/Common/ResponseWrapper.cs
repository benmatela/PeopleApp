using System.Net;

namespace People.Domain.Common;

/// <summary>
/// Response Wrapper - Used to standardize all our responses
/// </summary>
public class ResponseWrapper<T> where T : class
{
    private HttpStatusCode _statusCode;
    private string _message;
    private bool _success;
    private T? _data;

    public ResponseWrapper(HttpStatusCode StatusCode, string Message, bool Success, T? Data)
    {
        _statusCode = StatusCode;
        _message = Message;
        _success = Success;
        _data = Data;
    }
}