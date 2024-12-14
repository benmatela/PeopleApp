
using System.ComponentModel.DataAnnotations;

namespace People.Application.DTOs;

/// <summary>
/// Base Person Request
/// <para>Groups common properties for all person requests</para> 
/// </summary>
public class BasePersonRequest
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string LastName { get; set; } = string.Empty;
}

/// <summary>
/// Create Person Request
/// <para>Used to create a new person</para> 
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
/// Update Person Request
/// <para>Used to update an existing person</para> 
/// </summary>
public class UpdatePersonRequest : BasePersonRequest
{
}

/// <summary>
/// Person Response
/// <para>Used to hold existing person(s)</para> 
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
