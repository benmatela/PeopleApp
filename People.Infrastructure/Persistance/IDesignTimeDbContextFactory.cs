using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using People.Infrastructure.Persistance;

public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        optionsBuilder.UseSqlServer(
            "Server=localhost;Database=people-db;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True");

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}
