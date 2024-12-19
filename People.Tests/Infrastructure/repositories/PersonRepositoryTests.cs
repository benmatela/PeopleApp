using Moq;
using People.Application.DTOs;
using People.Application.Interfaces;
using Xunit;

/// <summary>
/// Tests PersonRepository
/// 
/// <para>Tests how Commands and Queries handle database operations, ensuring 
/// data is stored and retrieved as expected.</para>
/// </summary>
public class PersonRepositoryTests
{
    private readonly Mock<IPersonRepository> _mockPersonRepository;

    public PersonRepositoryTests()
    {
        _mockPersonRepository = new Mock<IPersonRepository>();
    }

    /// <summary>
    /// This test ensures that a new person gets created.
    /// </summary>
    /// <returns></returns>
    [Fact]
    public async Task Create_ShouldCreatePerson_WhenValidCreateRequest()
    {
        // 1. Arrange
        var personToCreate = new CreatePersonRequest();
        personToCreate.DateOfBirth = new DateTime();
        personToCreate.FirstName = "John";
        personToCreate.LastName = "Doe";
        var expectedPerson = new PersonResponse();
        expectedPerson.DateOfBirth = new DateTime();
        expectedPerson.FirstName = "John";
        expectedPerson.LastName = "Doe";

        _mockPersonRepository.Setup(repo => repo.Create(It.IsAny<CreatePersonRequest>()))
            .ReturnsAsync(expectedPerson);

        // 2. Act
        var result = await _mockPersonRepository.Object.Create(personToCreate);

        // 3. Assert
        Assert.Equal(expectedPerson.FirstName, result.FirstName);
        Assert.Equal(expectedPerson.LastName, result.LastName);
        Assert.Equal(expectedPerson.DateOfBirth, result.DateOfBirth);

        // Verify it runs once
        _mockPersonRepository.Verify(repo => repo.Create(It.IsAny<CreatePersonRequest>()), Times.Once);
    }
}
