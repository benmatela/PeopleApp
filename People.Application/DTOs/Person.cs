
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

    [Required]
    public DateTime DateOfBirth { get; set; }
}

/// <summary>
/// Used to create a new person
/// </summary>
public class CreatePersonRequest : BasePersonRequest
{

}

/// <summary>
/// Used to update an existing person
/// </summary>
public class UpdatePersonRequest : BasePersonRequest
{
    [Required]
    public Guid Id { get; set; }
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

/// <summary>
/// Used to hold all keys to search people by
/// </summary>
public class SearchPersonRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}
