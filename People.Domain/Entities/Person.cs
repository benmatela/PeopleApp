using System.ComponentModel.DataAnnotations;
using People.Domain.Common;

namespace People.Domain.Entities;

/// <summary>
/// Person Entity
/// <para>Person domain entity</para> 
/// </summary>
public class Person : BaseEntity
{
    [MinLength(3)]
    [MaxLength(200)]
    public string FirstName { get; set; } = string.Empty;

    [MinLength(3)]
    [MaxLength(200)]
    public string LastName { get; set; } = string.Empty;

    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
}