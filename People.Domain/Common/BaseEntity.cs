using System.ComponentModel.DataAnnotations;

namespace People.Domain.Common;

/// <summary>
/// Base Entity
/// <para>Groups common logic for all domain entities</para> 
/// </summary>
public class BaseEntity
{
    [Key]
    public Guid Id { get; set; }
    public DateTime DateCreated { get; set; }
}