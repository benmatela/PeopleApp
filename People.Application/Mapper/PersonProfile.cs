using AutoMapper;
using People.Application.DTO;
using People.Domain.Entities;

namespace CleanArchitecture.Application.Mapper
{
    /// <summary>
    /// Person Profile - Used to map person domain object to the view model and reverse map
    /// </summary>
    public class PersonProfile : Profile
    {
        public PersonProfile()
        {
            CreateMap<CreatePersonRequest, Person>();
            CreateMap<Person, PersonResponse>();
        }
    }
}