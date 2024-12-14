
using System.ComponentModel.DataAnnotations;

namespace People.Application.DTOs;

public class CreatePersonRequest
{
    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string Name { get; set; } = String.Empty;

    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string Description { get; set; } = String.Empty;

    [Required]
    [Range(0.01, 1000)]
    public double Price { get; set; }
}

public class UpdatePersonRequest : CreatePersonRequest
{
    [Required]
    public Guid Id { get; set; }
}

public class ProductResponse
{
    public Guid Id { get; set; }
    public DateTime DateCreated { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
}
