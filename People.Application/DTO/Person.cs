using System.ComponentModel.DataAnnotations;
using People.Presentation.Server.Models;

namespace People.Application.DTO;

/// <summary>
/// Create Person Request - Used to create a new person
/// </summary>
public class CreatePersonRequest
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public DateTime DateCreated { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 3)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }
}

/// <summary>
/// Update Person Request - Used to update an existing person
/// </summary>
public class UpdatePersonRequest : CreatePersonRequest
{
    [Required]
    public int Age { get; set; }
}

/// <summary>
/// Person Response - Used to return an existing person
/// </summary>
public class PersonResponse
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
}