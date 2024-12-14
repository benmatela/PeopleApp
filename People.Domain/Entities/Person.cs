using System.ComponentModel.DataAnnotations;
using People.Domain.Common;

namespace People.Domain.Entities;

/// <summary>
/// Person Entity - Person specific entity
/// </summary>
public class Person: BaseEntity
{
    [MaxLength(200)]
    public string FirstName { get; set; } = string.Empty;
    [MaxLength(200)]
    public string LastName { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
}