# Clean Architecture with CQRS for People Management System
### Author: Ben Matela

This repository demonstrates how to implement Clean Architecture with CQRS (Command Query Responsibility Segregation) in a People Management system.

The architecture is organized into multiple layers to achieve separation of concerns, maintainability, and scalability. The solution consists of the following projects:

## How its broken down:

* People.Application – The application layer, containing business logic and CQRS commands/queries.
* People.Domain – The domain layer, containing domain entities, value objects, aggregates, and domain logic.
* People.Infrastructure – The infrastructure layer, providing implementations for data access, external services, and other technical concerns.
* People.Tests – Unit and integration tests for the application.
* People.Presentation – The presentation layer, containing client-side and server-side components.
  - people.presentation.client – The client-side user interface (React).
  - People.Presentation.Server – The server-side web API or backend for handling requests(.Net Core API).

## Folder Structure:

```arduino
PeopleApp/
├── People.Application/
│   ├── Commands/
│   ├── Queries/
│   ├── Helpers/
│   ├── Mapper/
│   ├── Interfaces/
│   └── DTOs/
├── People.Domain/
│   ├── Entities/
│   ├── Common/
│   └── Interfaces/
├── People.Infrastructure/
│   ├── Persistence/
│   └── Repositories/
├── People.Tests/
│   ├── Application/
│   ├── Domain/
│   └── Infrastructure/
├── People.Presentation/
│   ├── people.presentation.client/
│   └── People.Presentation.Server/
```

# Clean Architecture Overview

Clean Architecture emphasizes separation of concerns by organizing the code into distinct layers:

1. Presentation Layer – This layer consists of the user interface (UI) and is responsible for displaying data to the user and receiving user inputs. It interacts with the application layer to process requests and display results.

2. Application Layer – This layer handles business use cases by managing commands, queries, and their corresponding handlers. It’s responsible for orchestrating the interaction between the domain layer and infrastructure layer.

3. Domain Layer – Contains the core business logic, including domain entities, aggregates, value objects, and domain events. This layer is isolated from external dependencies and should be stable over time.

4. Infrastructure Layer – Implements the necessary infrastructure to interact with external systems, such as databases, message queues, third-party services, etc. It also implements repositories and data access mechanisms.

5. Tests Layer – This layer contains tests for the application, domain, and infrastructure layers, ensuring correctness and reliability.

# CQRS Architecture

CQRS is applied in this project to separate the command side (modifying data) from the query side (reading data). This allows for optimized performance and scalability, especially for systems with complex data access patterns.

> Command Side

Commands are used to perform actions (create, update, delete). Each command has a corresponding handler that contains the business logic to perform the operation.

Example Command:

```csharp

public record CreatePersonCommand(CreatePersonRequest Person) : IRequest<PersonResponse>;


/// <summary>
/// Handles the command to create a new person.
/// <para>Since commands are intended to modify the state, we implement scrictrer error handling</para>
/// </summary>
/// <param name="personRepository"></param>
/// <param name="_logger"></param>
public class CreatePersonCommandHandler(IPersonRepository personRepository, ILogger<CreatePersonCommand> _logger)
    : IRequestHandler<CreatePersonCommand, PersonResponse>
{
    public async Task<PersonResponse> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogWarning($"Attempt to create a person: {request.Person.FirstName} {request.Person.LastName}");

            var newPerson = await personRepository.Create(request.Person);

            _logger.LogInformation($"Person created successfully: {newPerson.Id}");

            return newPerson;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while creating the person.");
            throw; // Rethrow the exception after logging
        }
    }
}
```

> Query Side

Queries are used to retrieve data. Each query is handled separately from commands, allowing independent optimizations (e.g., caching or read models).

```csharp

public record GetPersonByIdQuery(Guid Guid) : IRequest<PersonResponse>;

/// <summary>
/// Handles the query to get a single person by ID 
/// <para>Since commands are intended to modify the state, we implement scrictrer error handling</para>
/// </summary>
/// <param name="personRepository"></param>
public class GetPersonByIdQueryHandler(IPersonRepository personRepository)
    : IRequestHandler<GetPersonByIdQuery, PersonResponse>
{
    public async Task<PersonResponse> Handle(GetPersonByIdQuery request, CancellationToken cancellationToken)
    {
        return await personRepository.Get(request.Guid);
    }
}
```