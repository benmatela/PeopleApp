using People.Domain.Events;
using StackExchange.Redis;
using System.Text.Json;

namespace People.Infrastructure.Services.PubSub;

/// <summary>
/// RedisEventPublisher implements the IEventPublisher interface, which abstracts the event-publishing mechanism. 
/// <par>It uses StackExchange.Redis to publish messages to a Redis channel (person:created in this case).</para>
/// <para>Serialization: The event (PersonCreateEvent) is serialized to JSON to facilitate communication across systems.</para>
/// </summary>
public class RedisEventSubscriber
{
    private readonly IConnectionMultiplexer _redis;
    private readonly ISubscriber _subscriber;

    public RedisEventSubscriber(IConnectionMultiplexer redis)
    {
        _redis = redis;
        _subscriber = _redis.GetSubscriber();
    }

    [Obsolete]
    public void Subscribe()
    {
        // Subscribe to the "person:created" channel and handle the incoming messages
        _subscriber.Subscribe("person:created", (channel, message) =>
        {
            // Deserialize the message to PersonCreatedEvent
            var eventMessage = JsonSerializer.Deserialize<PersonCreateEvent>(message);
            if (eventMessage != null)
            {
                // Process the event (for example, log the event or take further actions)
                Console.WriteLine($"Person Created: {eventMessage.PersonId} (ID: {eventMessage.PersonId})");
            }
        });
    }
}
