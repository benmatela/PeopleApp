
using System.ComponentModel.DataAnnotations;

namespace People.Application.DTOs;

/// <summary>
/// Groups common properties for all person requests 
/// </summary>
public class BasePersonRequest
{
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
    public string DateOfBirth { get; set; } = string.Empty;
}

/// <summary>
/// Used to update an existing person
/// </summary>
public class UpdatePersonRequest : BasePersonRequest
{
    [Required]
    public Guid Id { get; set; }
    [Required]
    public string DateCreated { get; set; } = string.Empty;
    [Required]
    public int Age { get; set; }
}

/// <summary>
/// Used to hold existing person(s)
/// </summary>
public class PersonResponse : BasePersonRequest
{
    public Guid Id { get; set; }
    public string DateCreated { get; set; } = string.Empty;
    public string DateOfBirth { get; set; } = string.Empty;
    public int Age { get; set; }
}
