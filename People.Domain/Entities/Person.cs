using People.Domain.Common;

namespace People.Domain.Entities;

/// <summary>
/// Person Entity - Person specific entity
/// </summary>
public class Person: BaseEntity
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
}