using MediatR;

namespace People.Domain.Events;

/// <summary>
/// Handles the event when a new person is created
/// <para>Domain events should be part of the Domain Layer and encapsulate the business 
/// meaning of the event.<para> 
/// <para>This keeps the core business logic independent of external infrastructure concerns.</para>
/// </summary>
public class PersonRemoveEvent : INotification
{
    public Guid UsersId { get; }
    public DateTime DateDeleted { get; }

    public PersonRemoveEvent(Guid userId, DateTime dateDeleted)
    {
        UsersId = userId;
        DateDeleted = dateDeleted;
    }
}