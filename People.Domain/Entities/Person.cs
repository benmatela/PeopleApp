namespace People.Domain.Entities;

/// <summary>
/// Person Entity
/// </summary>
public class Person
{
    public Guid Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
    public DateTime DateCreated { get; set; }
}