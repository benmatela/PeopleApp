# Clean Architecture with CQRS for People Management System
### Author: Ben Matela

This repository demonstrates how to implement Clean Architecture with CQRS (Command Query Responsibility Segregation) in a People Management system.

This app is using C# for the backend and TypeScript with React for the frontend which is a common and powerful combination in modern web development.

C# is a robust, mature, and feature-rich programming language, and when combined with ASP.NET Core, it becomes an excellent choice for backend development.

React is one of the most popular libraries for building user interfaces, and when combined with TypeScript, it provides a strong foundation for building scalable and maintainable frontend applications.

Using C# for the backend and TypeScript with React for the frontend offers a combination of performance, scalability, strong typing, and developer productivity. This stack is well-suited for building modern, scalable, and maintainable web applications, with a clear separation between the frontend and backend layers, which is ideal for complex projects, enterprise applications, and teams working on large codebases.

The architecture is organized into multiple layers to achieve separation of concerns, maintainability, and scalability. The solution consists of the following projects:

## How its broken down:

* `People.Application` – The application layer, containing business logic, event handling and CQRS commands/queries.
* `People.Domain` – The domain layer containing domain entities, domain events, value objects, aggregates, and domain logic.
* `People.Infrastructure` – The infrastructure layer, providing implementations for data access, external services, and other technical concerns.
* `People.Tests` – Unit and integration tests for the application.
* `People.Presentation` – The presentation layer, containing client-side and server-side components.
  - people.presentation.client – The client-side user interface (React).
  - People.Presentation.Server – The server-side web API or backend for handling requests(.Net Core API).

## Folder Structure:

```arduino
PeopleApp/
├── People.Application/
│   ├── Commands/
│   ├── Queries/
│   ├── EventHandlers/
│   ├── Helpers/
│   ├── Mapper/
│   ├── Interfaces/
│   └── DTOs/
├── People.Domain/
│   ├── Entities/
│   ├── Events/
│   └── Interfaces/
├── People.Infrastructure/
│   ├── Persistence/
│   ├── Repositories/
│   └── Services/
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

1. `Presentation Layer` – This layer consists of the user interface (UI) and is responsible for displaying data to the user and receiving user inputs. It interacts with the application layer to process requests and display results.

2. `Application Layer` – This layer handles business use cases by managing commands, queries, event handling and their corresponding handlers. It’s responsible for orchestrating the interaction between the domain layer and infrastructure layer.

3. `Domain Layer` – Contains the core business logic, including domain entities, aggregates, value objects, and domain events. This layer is isolated from external dependencies and should be stable over time.

4. `Infrastructure Layer` – Implements the necessary infrastructure to interact with external systems, such as databases, message queues, third-party services, etc. It also implements repositories and data access mechanisms.

5. `Tests Layer` – This layer contains tests for the application, domain, and infrastructure layers, ensuring correctness and reliability.

# CQRS Architecture

`CQRS(Command Query Responsibility Segregation)` is applied in this project to separate the command side (modifying data) from the query side (reading data). This allows for optimized performance and scalability, especially for systems with complex data access patterns.

Here’s a simple diagram to help visualize `CQRS` with `MediatR` in a `Clean Architecture` setup:

```text
     [Controller or API Endpoint]
               |
         MediatR.Send()
         /            \
[Command Handler]   [Query Handler]
        |                  |
[Application Layer Logic]  |
        |                  |
[Domain Layer Entities]    |
        |                  |
[Repository / DB Access] <-
```

`Send()` is from MediatR, which routes your request to the correct handler.

`MediatR` is a .NET library that implements the Mediator pattern, used for decoupling communication between components. 

In CQRS, you use MediatR to:

1. Dispatch commands and queries
2. Handle them via registered handlers
   
This reduces tight coupling between layers and keeps business logic cleanly isolated.

> Commands

`Commands` are used to perform actions (create, update, delete). Each command has a corresponding handler that contains the business logic to perform the operation.

Example Command:

```csharp

public record CreatePersonCommand(CreatePersonRequest Person) : IRequest<PersonResponse>;


/// <summary>
/// Handles the command to create a new person.
/// <para>Since commands are intended to modify the state, we implement scricter error handling</para>
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

> Queries

`Queries` are used to retrieve data. Each query is handled separately from commands, allowing independent optimizations (e.g., caching or read models).

```csharp

public record GetPersonByIdQuery(Guid Guid) : IRequest<PersonResponse>;

/// <summary>
/// Handles the query to get a single person by ID 
/// <para>Since queries are intended to return data without side effects or modifying the state, 
/// we are not too strict with error handling</para>
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

# Project Description:

### People.Application
* `Commands`: Contains classes for creating, updating, deleting, or performing other actions on domain entities.
* `Queries`: Contains classes for querying data, typically read-only operations.
* `EventHandlers`: Event handlers often involve infrastructure concerns (e.g. interacting with databases or message queues) and putting them in this Layer ensures that they can be implemented in a flexible way.
* `DTOs`: Data Transfer Objects used for transferring data between layers.
* `Helpers`: Common method that can be used across the app eg DateHelper which gets date by date of birth.
* `Mappers`: Convert one object type to the other eg CreatePersonRequest DTO to Person entity.
* `Interfaces`: Our interfaces eg IBaseRepository which has all the common fields across repositories.

### People.Domain
* `Entities`: Core business objects representing data in the system (e.g. Person).
* `Events`: Domain event for example when a new person is created (e.g. PersonCreatedEvent).

This app currently uses `In Memory Database` but an example SQL Table design for our `Person` entity would look like:

```sql
CREATE TABLE [People] (
    Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,  -- Set as primary key for uniqueness
    FirstName VARCHAR(255) NOT NULL,             -- Make sure FirstName is not NULL
    LastName VARCHAR(255) NOT NULL,              -- Make sure LastName is not NULL
    DateOfBirth DATETIME NOT NULL,               -- Make sure DateOfBirth is not NULL
    DateCreated DATETIME DEFAULT GETDATE() NOT NULL  -- Automatically set current date/time on record creation
);
```

### People.Infrastructure
* `Persistence`: Responsible for data access, including implementations of repositories using databases or other storage systems.
* `Repositories`: Interface and implementation of repositories for accessing entities from the database.
* `Services`: External services or utilities used by the application. For example the `Redis` pub/sub in  `Services/PubSub` folder. 
    - Publisher(Pub): Sends messages to a channel.
    - Subscriber(Sub): Listens to messages from a specific channel (or channels).
    - Channel: A message category where publishers send messages and subscribers listen to messages.

#### Using `In Memory Database`:

This is how `ApplicationDbContext.cs` file looks like:

```csharp
using Microsoft.EntityFrameworkCore;
using People.Domain.Entities;

namespace People.Infrastructure.Persistance;

/// <summary>
/// A session with the database
/// </summary>
public class ApplicationDbContext : DbContext
{
    public DbSet<Person> People { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("PeopleDB");
    }
}
```

No need to configure `ConnectionString` unless we use a SQL database.

#### Using `SQL` database (MSSQL in our case):

This is how `ApplicationDbContext.cs` file looks like:

```csharp
using Microsoft.EntityFrameworkCore;
using People.Domain.Entities;

namespace People.Infrastructure.Persistance;

/// <summary>
/// A session with the database
/// </summary>
public class ApplicationDbContext : DbContext
{
    public DbSet<Person> People { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
    {
    }
}
```

Then update `DependencyInjection.cs` file with a new service:

```csharp
// MSSQL DB
// Get the connection string set in the environment variables in docker-compose.yml
string mssqlConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") ?? "";
services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlServer(mssqlConnectionString));
```

In our `docker-compose.yml`:

```yml
environment:
    - DB_CONNECTION_STRING=Server=people-db,1433;Database=people-db;User Id=sa;Password=YourStrong!Passw0rd;Encrypt=False;TrustServerCertificate=True;  # DB connection string
```

Or .env `file`:

```text
DB_CONNECTION_STRING=Server=people-db,1433;Database=people-db;User Id=sa;Password=YourStrong!Passw0rd;Encrypt=False;TrustServerCertificate=True; 
```

### People.Tests
* Contains unit tests, integration tests, and mocks for testing the application’s various layers:
* `Application`: Tests for CQRS commands and queries.
* `Domain`: Tests for domain logic, domain events, entities, and value objects.
* `Infrastructure`: Tests for repositories, persistence layer, and services.
* `People.Presentation`: This layer contains the user interface components:

### people.presentation.client
* The client-side project, which could be a web frontend, mobile app, or another type of client application. 
* It interacts with the backend API to send commands and queries.

### People.Presentation.Server
* The server-side project, which hosts the web API or backend for handling HTTP requests, performing actions via commands, and returning data via queries.

## Installation

> Prerequisites

* .NET 9 for the backend
* NodeJs for the React frontend
* Docker and Docker Compose for containerization

For the rest of the packages used in the app, in the client side you can look at `package.json` and for the different API layers look at the `csproj` in each layer eg `People.Infrastructure/People.Infrastructure.csproj`.

## Dev Setup(with Docker):

1. Clone the repository:
```bash
git clone https://github.com/benmatela/PeopleApp.git
cd PeopleApp
```

2. Run the Docker command:

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

Use `docker-compose down` when you need to shut `down` the container.

### Add migrations(in the root folder):

First install `Entity Framework`:

```bash
dotnet tool install --global dotnet-ef
```

Then whenever your entities change for example one key changing from a `byte` to `string`, you can add new migrations or else skip to the next command.

```bash
dotnet ef migrations add YourMigrationName --project People.Infrastructure --startup-project People.Presentation/People.Presentation.Server
```

Update database using existing migrations:

```bash
dotnet ef database update --project People.Infrastructure --startup-project People.Presentation/People.Presentation.Server
```

Backend: http://localhost:5050/swagger/index.html

Client: http://localhost:3000

Your changes will now reflect when you change the code.

## Dev Setup(without Docker):

1. Clone the repository:
```bash
git clone https://github.com/benmatela/PeopleApp.git
cd PeopleApp
```

### Add migrations(in the root folder):

First install `Entity Framework`:

```bash
dotnet tool install --global dotnet-ef
```

Then whenever your entities change for example one key changing from a `byte` to `string`, you can add new migrations or else skip to the next command.

```bash
dotnet ef migrations add YourMigrationName --project People.Infrastructure --startup-project People.Presentation/People.Presentation.Server
```

Update database using existing migrations:

```bash
dotnet ef database update --project People.Infrastructure --startup-project People.Presentation/People.Presentation.Server
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Build project
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
Swagger: http://localhost:5050/swagger/index.html

Client: http://localhost:3000/

### Run API tests

In the root folder:

```bash
dotnet test
```

### Run Client side tests

In the root folder:

```bash
npm test
```

## Deployments

This app is already containerized so a few things need to be updated:

> Connection String

In the `docker-compose.yml` we use `SQL Server` and `Redis`. To update the connection strings in `docker-compose.yml`, update to production environment:

* API:

```yml
environment:
    - REDIS_CONNECTION_STRING=people-redis:6379,abortConnect=false  # Redis connection string
    - DB_CONNECTION_STRING=Server=people-db,1433;Database=people-db;User Id=sa;Password=YourStrong!Passw0rd;Encrypt=False;TrustServerCertificate=True;  # DB connection string
```

* Client:

```yml
environment:
    - NODE_ENV=production
    - VITE_PEOPLE_API_URL=http://0.0.0.0:5050 
```

> Docker Ignore Files

To avoid unnecessary files being included in the Docker image, create `.dockerignore` files for each project to exclude unnecessary build and source files.

> Build and Run the Docker Containers:

From the root folder:

```bash
docker-compose -f docker-compose.yml up -d --build
```

The command asks `Docker Compose` to run our `Dockerfile` within the project eg `Dockerfile.client`.

`-d` means run in detached mode(close terminal when done).

`--build` only required if docker files changed. Meaning after the first command you can run:

```bash
docker-compose -f docker-compose.yml up -d
```

Use `docker-compose down` to shut `down` the container.

Backend: http://0.0.0.0:5050

Client: http://0.0.0.0:3000

## Future Improvements: 
* Add unit tests for the rest of the Commands and Qeuries and also other application layers.
* Add caching mechanisms for query optimization.
* Implement authentication and authorization.
* Expand domain logic to handle more complex use cases.
* Make local dev environment for Docker
* More tests for the React client side
* Make client side mobile friendly
* Update the client side `SearchPerson` component to be reusable.
