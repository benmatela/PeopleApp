using System.Collections;
using System.Threading;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using People.Application.DTOs;
using People.Application.Interfaces;
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

        return _mapper.Map<PersonResponse>(mappedPerson);
    }

    public async Task<PersonResponse> Get(Guid personId)
    {
        var existingPerson = await _dbContext.People.FirstOrDefaultAsync(person => person.Id == personId);

        return _mapper.Map<PersonResponse>(existingPerson);
    }

    public async Task<IEnumerable<PersonResponse>> GetAll()
    {
        var allExistingPeople = await _dbContext.People.ToListAsync();

        return _mapper.Map<IEnumerable<PersonResponse>>(allExistingPeople);
    }

    public async Task<bool> Update(Guid personId, UpdatePersonRequest request)
    {
        var existingPerson = await _dbContext.People.FirstOrDefaultAsync(person => person.Id == personId);
        if (existingPerson is not null)
        {
            existingPerson.FirstName = request.FirstName;
            existingPerson.LastName = request.LastName;

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
            var searchQuery = _dbContext.People.Where(p => p.FirstName.Contains(request.FirstName));
            // Execute the query asynchronously
            var people = await searchQuery.ToListAsync(cancellationToken);
            return _mapper.Map<IEnumerable<PersonResponse>>(people);
        }

        if (!string.IsNullOrEmpty(request.LastName))
        {
            // We declare the empty query for our person entity

            var searchQuery = _dbContext.People.Where(p => p.LastName.Contains(request.LastName));
            // Execute the query asynchronously
            var people = await searchQuery.ToListAsync(cancellationToken);
            return _mapper.Map<IEnumerable<PersonResponse>>(people);
        }

        return [];
    }
}