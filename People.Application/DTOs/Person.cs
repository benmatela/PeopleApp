
using System.ComponentModel.DataAnnotations;

namespace People.Application.DTOs;

/// <summary>
/// Groups common properties for all person requests 
/// </summary>
public class BasePersonRequest
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    [StringLength(255, MinimumLength = 3)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(255, MinimumLength = 3)]
    public string LastName { get; set; } = string.Empty;
}

/// <summary>
/// Used to create a new person
/// </summary>
public class CreatePersonRequest : BasePersonRequest
{
    [Required]
    public DateTime DateCreated { get; set; }

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    public int Age { get; set; }
}

/// <summary>
/// Used to update an existing person
/// </summary>
public class UpdatePersonRequest : BasePersonRequest
{
}

/// <summary>
/// Used to hold existing person(s)
/// </summary>
public class PersonResponse
{
    public Guid Id { get; set; }
    public DateTime DateCreated { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
}
