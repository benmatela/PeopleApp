using Microsoft.EntityFrameworkCore;
using People.Application.Repositories;
using People.Domain.Entities;
using People.Domain.Helpers;
using People.Infrastructure.Persistance;

namespace People.Infrastructure.Repositories;

public class PersonRepository(ApplicationDbContext dbContext) : IPersonRepository
{
    public async Task<Person> Create(Person person)
    {
        person.Id = Guid.NewGuid();
        person.Age = DateHelpers.GetAge(person.DateOfBirth);

        dbContext.People.Add(person);

        await dbContext.SaveChangesAsync();

        return person;
    }

    public async Task<Person> Get(Guid personId)
    {
        return await dbContext.People.FirstOrDefaultAsync(person => person.Id == personId);
    }

    public async Task<IEnumerable<Person>> GetAll()
    {
        return await dbContext.People.ToListAsync();
    }

    public async Task<bool> Update(Guid personId, Person person)
    {
        var existingPerson = await dbContext.People.FirstOrDefaultAsync(person => person.Id == personId);
        if (existingPerson is not null)
        {
            existingPerson.FirstName = person.FirstName;
            existingPerson.LastName = person.LastName;
            existingPerson.DateOfBirth = person.DateOfBirth;
            existingPerson.Age = DateHelpers.GetAge(person.DateOfBirth);

            await dbContext.SaveChangesAsync();

            return true;
        }

        return false;
    }

    public async Task<bool> Remove(Guid personId)
    {
        var existingPerson = await dbContext.People.FirstOrDefaultAsync(person => person.Id == personId);
        if (existingPerson is not null)
        {
            dbContext.Remove(existingPerson);

            return await dbContext.SaveChangesAsync() > 0;
        }

        return false;
    }

}