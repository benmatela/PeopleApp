using MediatR;
using People.Domain.Interfaces;

namespace People.Application.Commands;

public record RemovePersonCommand(Guid PersonId) : IRequest<bool>;

/// <summary>
/// Handles the command to remove/delete an existing person.
/// </summary>
public class RemovePersonCommandHandler(IPersonRepository personRepository)
    : IRequestHandler<RemovePersonCommand, bool>
{
    public async Task<bool> Handle(RemovePersonCommand request, CancellationToken cancellationToken)
    {
        return await personRepository.Remove(request.PersonId);
    }
}