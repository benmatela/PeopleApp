using AutoMapper;
using People.Application.DTOs;
using People.Domain.Entities;

namespace People.Application.Mapper;

/// <summary>
/// Person Profile
/// <para>Used to map person data from one object to another</para> 
/// </summary>
public class PersonProfile : Profile
{
    public PersonProfile()
    {
        CreateMap<CreatePersonRequest, Person>();
        CreateMap<Person, PersonResponse>();
    }
}