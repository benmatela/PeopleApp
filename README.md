# Clean Architecture with CQRS for People Management System
### Author: Ben Matela

This repository demonstrates how to implement Clean Architecture with CQRS (Command Query Responsibility Segregation) in a People Management system.

The architecture is organized into multiple layers to achieve separation of concerns, maintainability, and scalability. The solution consists of the following projects:

## How its broken down:

* People.Application – The application layer, containing business logic and CQRS commands/queries.
* People.Domain – The domain layer, containing domain entities, value objects, aggregates, and domain logic.

Example SQL Table desing for our Person entity:

SQL Table Design:

```sql
CREATE TABLE [People] (
    Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,  -- Set as primary key for uniqueness
    FirstName VARCHAR(255) NOT NULL,             -- Make sure FirstName is not NULL
    LastName VARCHAR(255) NOT NULL,              -- Make sure LastName is not NULL
    DateOfBirth DATETIME NOT NULL,               -- Make sure DateOfBirth is not NULL
    DateCreated DATETIME DEFAULT GETDATE() NOT NULL  -- Automatically set current date/time on record creation
);
```

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

## Project Descriptions

### People.Application
* Commands: Contains classes for creating, updating, deleting, or performing other actions on domain entities.
* Queries: Contains classes for querying data, typically read-only operations.
* DTOs: Data Transfer Objects used for transferring data between layers.

### People.Domain
* Entities: Core business objects representing data in the system (e.g., Person).
* Common: Core business objects representing data in the system (e.g., Person)

### People.Infrastructure
* Persistence: Responsible for data access, including implementations of repositories using databases or other storage systems.
* Repositories: Interface and implementation of repositories for accessing entities from the database.
* Services: External services or utilities used by the application.

### People.Tests
* Contains unit tests, integration tests, and mocks for testing the application’s various layers:
* Application: Tests for CQRS commands and queries.
* Domain: Tests for domain logic, entities, and value objects.
* Infrastructure: Tests for repositories, persistence layer, and services.
* People.Presentation: This layer contains the user interface components:

### people.presentation.client
* The client-side project, which could be a web frontend, mobile app, or another type of client application. 
* It interacts with the backend API to send commands and queries.

### People.Presentation.Server
* The server-side project, which hosts the web API or backend for handling HTTP requests, performing actions via commands, and returning data via queries.

## Installation

> Prerequisites

* .NET 8 for the backend
* NodeJs for the React frontend
* Docker for containerization

## Setting Up:

1. Clone the repository:
```bash
git clone https://github.com/benmatela/PeopleApp.git
cd PeopleApp
```

2. Restore dependencies:
```bash
dotnet restore
```

3. dotnet build
```bash
dotnet build
```

4. Run App
```bash
dotnet run --project dotnet run --project People.Presentation/People.Presentation.Server
```
Or simply go to this folder `People.Presentation/People.Presentation.Server`
Then:
```bash
dotnet run
```

5. Run tests
```bash
dotnet test
```

5. Running the containerized 
```bash
dotnet test
```

## Future Improvements: 
* Add unit tests for the rest of the Commands, Qeuries and also othe application layers.
* Implement asynchronous messaging (e.g., with MediatR, RabbitMQ, etc.) for decoupling commands and queries.
* Add caching mechanisms for query optimization.
* Implement authentication and authorization.
* Expand domain logic to handle more complex use cases.
* More tests for the React client side
* Update the client side `SearchPerson` component to be reusable.
