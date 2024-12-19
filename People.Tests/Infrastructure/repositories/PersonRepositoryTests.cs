using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Moq;
using People.Application.DTOs;
using People.Domain.Entities;
using People.Infrastructure.Persistance;
using People.Infrastructure.Repositories;
using Xunit;

public class PersonRepositoryTests
{
    public virtual required DbSet<Person> People { get; set; }
    private readonly DbContextOptions<ApplicationDbContext> _dbContextOptions;

    public PersonRepositoryTests()
    {
        // In-memory database for testing
        _dbContextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
    }

    [Fact]
    public async Task CreateAsync_ShouldAddPersonToDatabase()
    {
        // Arrange
        var mockedMapper = new Mock<IMapper>();
        var mapper = mockedMapper.Object;
        using var dbContext = new ApplicationDbContext(_dbContextOptions);
        var repository = new PersonRepository(dbContext, mapper);
        var personToCreate = new CreatePersonRequest
        {
            FirstName = "Tom",
            LastName = "Soy",
            DateOfBirth = DateTime.Now,
        };

        // Act
        PersonResponse result = await repository.Create(personToCreate);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(personToCreate.FirstName, result.FirstName);
        Assert.Equal(30, result.Age);

        // Verify the person was actually saved in the database
        var savedPerson = await dbContext.People.FindAsync(result.Id);
        Assert.NotNull(savedPerson);
        Assert.Equal(personToCreate.DateOfBirth, savedPerson.DateOfBirth);
    }

    // [Fact]
    // public async Task GetByNameAsync_ShouldReturnPerson_WhenPersonExists()
    // {
    //     // Arrange
    //     using var dbContext = new ApplicationDbContext(_dbContextOptions);
    //     var repository = new PersonRepository(dbContext);
    //     var person = new Person("John Doe", 30);
    //     await repository.CreateAsync(person);

    //     // Act
    //     var result = await repository.GetByNameAsync("John Doe");

    //     // Assert
    //     Assert.NotNull(result);
    //     Assert.Equal("John Doe", result.Name);
    // }

    // [Fact]
    // public async Task GetByNameAsync_ShouldReturnNull_WhenPersonDoesNotExist()
    // {
    //     // Arrange
    //     using var dbContext = new ApplicationDbContext(_dbContextOptions);
    //     var repository = new PersonRepository(dbContext);

    //     // Act
    //     var result = await repository.GetByNameAsync("Nonexistent");

    //     // Assert
    //     Assert.Null(result);
    // }
}
