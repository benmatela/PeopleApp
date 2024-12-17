using System.ComponentModel.DataAnnotations;

namespace People.Domain.Entities;

/// <summary>
/// Base Entity
/// <para>Groups common logic for all domain entities</para> 
/// </summary>
public class BaseEntity
{
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public DateTime DateCreated { get; set; } = DateTime.UtcNow.Date;
}