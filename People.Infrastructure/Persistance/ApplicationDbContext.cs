using Microsoft.EntityFrameworkCore;
using People.Domain.Entities;

namespace People.Infrastructure.Persistance;

/// <summary>
/// A session with the database
/// </summary>
public class ApplicationDbContext : DbContext
{
    public required DbSet<Person> People { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("People");
    }
}