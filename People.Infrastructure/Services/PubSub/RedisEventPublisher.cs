// People.Infrastructure/Services/RedisEventPublisher.cs
using People.Application.Interfaces;
using People.Domain.Events;
using StackExchange.Redis;
using System.Text.Json;


namespace People.Infrastructure.Services.PubSub;

/// <summary>
/// RedisEventPublisher implements the IEventPublisher interface, which abstracts the event-publishing mechanism. 
/// <para>It uses StackExchange.Redis to publish messages to a Redis channel (person:created in this case).</para>
/// <para>Serialization: The event (PersonCreateEvent) is serialized to JSON to facilitate communication across systems.</para>
/// </summary>
public class RedisEventPublisher : IEventPublisher
{
    private readonly IConnectionMultiplexer _redis;
    private readonly ISubscriber _subscriber;

    public RedisEventPublisher(IConnectionMultiplexer redis)
    {
        _redis = redis;
        _subscriber = _redis.GetSubscriber();
    }

    [Obsolete]
    public async Task PublishAsync(string channel, PersonCreateEvent eventMessage)
    {
        // Serialize the event to JSON
        var message = JsonSerializer.Serialize(eventMessage);

        // Publish the message to the specified channel
        await _subscriber.PublishAsync(channel, message);
    }
}
