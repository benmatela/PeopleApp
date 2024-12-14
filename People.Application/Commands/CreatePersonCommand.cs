using MediatR;
using People.Application.DTOs;
using People.Application.Interfaces;

namespace People.Application.Commands;

public record CreatePersonCommand(CreatePersonRequest Person) : IRequest<PersonResponse>;

/// <summary>
/// Handles the command to create a new person.
/// </summary>
public class CreatePersonCommandHandler(IPersonRepository personRepository)
    : IRequestHandler<CreatePersonCommand, PersonResponse>
{
    public async Task<PersonResponse> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
    {
        return await personRepository.Create(request.Person);
    }
}