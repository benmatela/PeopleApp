using Microsoft.EntityFrameworkCore;

namespace People.Infrastructure.Persistance;

/// <summary>
/// A session with the database
/// </summary>
internal class ApplicationDbContext : DbContext
{
    internal required DbSet<Domain.Entities.Person> People { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("PeopleDB");
    }
}