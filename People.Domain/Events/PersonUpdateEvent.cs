using MediatR;

namespace People.Domain.Events;

/// <summary>
/// Handles the event when a new person is created
/// <para>Domain events should be part of the Domain Layer and encapsulate the business 
/// meaning of the event.<para> 
/// <para>This keeps the core business logic independent of external infrastructure concerns.</para>
/// </summary>
public class PersonUpdateEvent : INotification
{
    public Guid PersonId { get; }
    public DateTime DateUpdated { get; }

    public PersonUpdateEvent(Guid personId, DateTime dateUpdated)
    {
        PersonId = personId;
        DateUpdated = dateUpdated;
    }
}