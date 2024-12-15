using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace People.Domain.Common;

/// <summary>
/// Base Entity
/// <para>Groups common logic for all domain entities</para> 
/// </summary>
public class BaseEntity
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime DateCreated { get; set; }
}