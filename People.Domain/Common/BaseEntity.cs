using System.ComponentModel.DataAnnotations;

namespace People.Domain.Common;

/// <summary>
/// Base Entity - Groups common logic for all domain entities
/// </summary>
public class BaseEntity
{
    [Key]
    public Guid Id { get; set; }
    public DateTime DateCreated { get; set; }
}