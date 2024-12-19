using MediatR;

namespace People.Domain.Events;

/// <summary>
/// Handles the event when a new person is created
/// <para>Domain events should be part of the Domain Layer and encapsulate the business 
/// meaning of the event.<para> 
/// <para>This keeps the core business logic independent of external infrastructure concerns.</para>
/// </summary>
public class PersonCreateEvent : INotification
{
    public Guid PersonId { get; }
    public DateTime DateCreated { get; }

    public PersonCreateEvent(Guid personId, DateTime dateCreated)
    {
        PersonId = personId;
        DateCreated = dateCreated;
    }
}