using Microsoft.EntityFrameworkCore;

namespace People.Infrastructure.Persistance;

/// <summary>
/// A session with the database
/// </summary>
public class ApplicationDbContext : DbContext
{
    public required DbSet<Domain.Entities.Person> People { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("People");
    }
}