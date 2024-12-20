using MediatR;
using People.Domain.Events;

/// <summary>
/// Handles PersonUpdateEvent
/// </summary>
public class PersonCreateEventHandler : INotificationHandler<PersonCreateEvent>
{
    /// <summary>
    /// MediatR is async in nature so we must use async in our code
    /// </summary>
    /// <param name="notification"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    async Task INotificationHandler<PersonCreateEvent>.Handle(PersonCreateEvent notification, CancellationToken cancellationToken)
    {
        try
        {
            // If our application requires the persistence of domain events, we’ll need an event 
            // store to record the events. 
            // This can be a dedicated storage mechanism, typically separate from your main relational database.
            // Simulating async email sending
            await Task.Delay(1000); // Simulate an async operation like an API call
            Console.WriteLine("Yay! Person Create Event went off on: {0} for: {1}", notification.DateCreated, notification.PersonId);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
