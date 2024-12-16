using AutoMapper;
using Moq;
using People.Application.DTOs;
using People.Application.Interfaces;
using People.Application.Queries;
using Xunit;

public class GetPersonByIdQueryHandlerTests
{
    private readonly Mock<IPersonRepository> _mockPersonRepository;
    private readonly GetPersonByIdQueryHandler _handler;
    private readonly IMapper _mapper;


    public GetPersonByIdQueryHandlerTests(IMapper Mapper)
    {
        _mockPersonRepository = new Mock<IPersonRepository>();
        _handler = new GetPersonByIdQueryHandler(_mockPersonRepository.Object);
        _mapper = Mapper;
    }

    /// <summary>
    /// This test verifies that null is returned if the person does not exist
    /// </summary>
    /// <returns></returns>
    public async Task Handle_ShouldReturnPerson_WhenPersonExists()
    {
        // Arrange
        var personId = Guid.NewGuid();
        var expectedPerson = new PersonResponse();
        expectedPerson.DateOfBirth = new DateTime();
        expectedPerson.FirstName = "Tom";
        expectedPerson.LastName = "Soy";
        // This is the object responsible for creating a cancellation token and sending a 
        // cancellation request to all copies of that token.
        CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
        // This is the structure used by listeners to monitor the token’s current state.
        CancellationToken token = cancellationTokenSource.Token;

        var mapped = _mapper.Map<CreatePersonRequest>(expectedPerson);
        _mockPersonRepository.Setup(repo => repo.Get(personId))
            .ReturnsAsync(expectedPerson);

        // Act
        var result = await _handler.Handle(new GetPersonByIdQuery(personId), token);

        // Assert
        Assert.Equal(expectedPerson.Id, result.Id);
        Assert.Equal(expectedPerson.FirstName, result.FirstName);
        Assert.Equal(expectedPerson.LastName, result.LastName);
        Assert.Equal(expectedPerson.DateCreated, result.DateCreated);
        Assert.Equal(expectedPerson.DateOfBirth, result.DateOfBirth);
    }

    /// <summary>
    /// This test verifies that null is returned if the person does not exist
    /// </summary>
    /// <returns></returns>
    public async Task Handle_ShouldReturnNull_WhenPersonDoesNotExist()
    {
        // Arrange
        var personId = Guid.NewGuid();
        // This is the object responsible for creating a cancellation token and sending a 
        // cancellation request to all copies of that token.
        CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
        // This is the structure used by listeners to monitor the token’s current state.
        CancellationToken token = cancellationTokenSource.Token;

        _mockPersonRepository.Setup(repo => repo.Get(personId))
            .Returns(Task.FromResult<PersonResponse>(null));

        // Act
        var result = await _handler.Handle(new GetPersonByIdQuery(personId), token);

        // Assert
        Assert.Null(result);
    }
}
