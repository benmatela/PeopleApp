using People.Domain.Events;

namespace People.Application.Interfaces;

/// <summary>
/// This defines the contract for event publishing.
/// </summary>
public interface IEventPublisher
{
    Task PublishAsync(string channel, PersonCreateEvent eventMessage);
}
