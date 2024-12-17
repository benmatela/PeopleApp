using System.ComponentModel.DataAnnotations;

namespace People.Domain.Entities;

/// <summary>
/// Person Entity
/// <para>Person domain entity</para> 
/// </summary>
public class Person : BaseEntity
{
    [Required]
    [MaxLength(255)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }
}