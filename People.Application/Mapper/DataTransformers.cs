using People.Application.DTOs;
using People.Application.Helpers;
using People.Domain.Entities;

namespace People.Application.Mapper;

/// <summary>
/// Used for custom data updating and mapping
/// </summary>
public static class DataTransformers
{
    /// <summary>
    /// Adds age to the person DTO
    /// </summary>
    /// <param name="person"></param>
    /// <returns></returns>
    public static PersonResponse MapToDTO(Person person)
    {
        var personDto = new PersonResponse
        {
            Id = person.Id,
            FirstName = person.FirstName,
            LastName = person.LastName,
            DateCreated = person.DateCreated,
            DateOfBirth = person.DateOfBirth,
            Age = DateHelpers.GetAge(person.DateOfBirth)  // Modify the age before sending
        };

        return personDto; // return newly mapped person
    }
}