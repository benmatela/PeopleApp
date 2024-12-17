using AutoMapper;
using Microsoft.EntityFrameworkCore;
using People.Application.DTOs;
using People.Application.Interfaces;
using People.Application.Mapper;
using People.Domain.Entities;
using People.Infrastructure.Persistance;

namespace People.Infrastructure.Repositories;

public class PersonRepository(ApplicationDbContext DbContext, IMapper Mapper) : IPersonRepository
{
    private readonly ApplicationDbContext _dbContext = DbContext;
    private readonly IMapper _mapper = Mapper;

    public async Task<PersonResponse> Create(CreatePersonRequest request)
    {
        var mappedPerson = _mapper.Map<Person>(request);

        _dbContext.People.Add(mappedPerson);

        await _dbContext.SaveChangesAsync();

        return DataTransformers.MapToDTO(mappedPerson);
    }

    public async Task<PersonResponse> Get(Guid personId)
    {
        var existingPerson = await _dbContext.People.FirstOrDefaultAsync(person => person.Id == personId);

        if (existingPerson is not null)
        {
            return DataTransformers.MapToDTO(existingPerson);
        }

        return _mapper.Map<PersonResponse>(existingPerson);
    }

    public async Task<IEnumerable<PersonResponse>> GetAll()
    {
        var allExistingPeople = await _dbContext.People.ToListAsync();

        var mappedPeople = allExistingPeople.Select(DataTransformers.MapToDTO).ToList();

        return mappedPeople;
    }

    public async Task<bool> Update(Guid personId, UpdatePersonRequest request)
    {
        var existingPerson = await _dbContext.People.FirstOrDefaultAsync(person => person.Id == personId);
        if (existingPerson is not null)
        {
            var mappedPerson = _mapper.Map<PersonResponse>(request);
            existingPerson.FirstName = request.FirstName;
            existingPerson.LastName = request.LastName;
            existingPerson.DateOfBirth = request.DateOfBirth;

            await _dbContext.SaveChangesAsync();

            return true;
        }

        return false;
    }

    public async Task<bool> Remove(Guid personId)
    {
        var existingPerson = await _dbContext.People.FirstOrDefaultAsync(person => person.Id == personId);
        if (existingPerson is not null)
        {
            _dbContext.Remove(existingPerson);

            return await _dbContext.SaveChangesAsync() > 0;
        }

        return false;
    }

    public async Task<IEnumerable<PersonResponse>> Search(SearchPersonRequest request, CancellationToken cancellationToken)
    {
        // Apply filters based on the input parameters
        if (!string.IsNullOrEmpty(request.FirstName))
        {
            // We declare the empty query for our person entity
            var searchQuery = _dbContext.People.Where(p => p.FirstName.Contains(request.FirstName));
            // Execute the query asynchronously
            var people = await searchQuery.ToListAsync(cancellationToken);

            return people.Select(DataTransformers.MapToDTO).ToList();
        }

        if (!string.IsNullOrEmpty(request.LastName))
        {
            // We declare the empty query for our person entity
            var searchQuery = _dbContext.People.Where(p => p.LastName.Contains(request.LastName));
            // Execute the query asynchronously
            var people = await searchQuery.ToListAsync(cancellationToken);
            return people.Select(DataTransformers.MapToDTO).ToList();
        }

        return [];
    }
}