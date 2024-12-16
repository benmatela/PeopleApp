using AutoMapper;
using Moq;
using People.Application.Commands;
using People.Application.DTOs;
using People.Application.Interfaces;
using Xunit;

public class CreatePersonCommandHandlerTests
{
    private readonly Mock<IPersonRepository> _mockPersonRepository;
    private readonly CreatePersonCommandHandler _handler;
    private readonly IMapper _mapper;

    public CreatePersonCommandHandlerTests(IMapper Mapper)
    {
        _mockPersonRepository = new Mock<IPersonRepository>();
        _handler = new CreatePersonCommandHandler(_mockPersonRepository.Object);
        _mapper = Mapper;
    }

    /// <summary>
    /// This test ensures that when a valid CreatePersonCommand is passed to the handler, 
    /// the AddAsync method on the repository is called once and returns the correct Person.
    /// </summary>
    /// <returns></returns>
    public async Task Handle_ShouldCreatePerson_WhenValidCommand()
    {
        // 1. Arrange
        var expectedPerson = new CreatePersonRequest();
        expectedPerson.DateOfBirth = new DateTime();
        expectedPerson.FirstName = "John";
        expectedPerson.LastName = "Doe";
        // This is the object responsible for creating a cancellation token and sending a 
        // cancellation request to all copies of that token.
        CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
        // This is the structure used by listeners to monitor the token’s current state.
        CancellationToken token = cancellationTokenSource.Token;

        var command = new CreatePersonCommand(expectedPerson);
        var mapped = _mapper.Map<Task<PersonResponse>>(expectedPerson);
        _mockPersonRepository.Setup(repo => repo.Create(It.IsAny<CreatePersonRequest>()))
            .Returns(mapped);

        // 2. Act
        var result = await _handler.Handle(command, token);

        // 3. Assert
        Assert.Equal(expectedPerson.FirstName, result.FirstName);
        Assert.Equal(expectedPerson.LastName, result.LastName);
        Assert.Equal(expectedPerson.DateOfBirth, result.DateCreated);
        _mockPersonRepository.Verify(repo => repo.Create(It.IsAny<CreatePersonRequest>()), Times.Once);
    }

    /// <summary>
    /// This test verifies that an exception is thrown if the command contains 
    /// invalid input (e.g., missing first name, last name, or age).
    /// </summary>
    public void Handle_ShouldThrowException_WhenFieldsAreMissing()
    {
        // 1. Arrange
        var expectedPerson = new CreatePersonRequest();
        expectedPerson.DateOfBirth = new DateTime();
        // This is the object responsible for creating a cancellation token and sending a 
        // cancellation request to all copies of that token.
        CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
        // This is the structure used by listeners to monitor the token’s current state.
        CancellationToken token = cancellationTokenSource.Token;

        var command = new CreatePersonCommand(expectedPerson); // Missing fields

        // 2 & 3 Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _handler.Handle(command, token));
        Assert.Equal("Invalid input", exception.Message);
    }
}
