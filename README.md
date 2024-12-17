# Clean Architecture with CQRS for People Management System
### Author: Ben Matela

This repository demonstrates how to implement Clean Architecture with CQRS (Command Query Responsibility Segregation) in a People Management system.

The architecture is organized into multiple layers to achieve separation of concerns, maintainability, and scalability. The solution consists of the following projects:

## Architectural Overview:

* People.Application – The application layer, containing business logic and CQRS commands/queries.
* People.Domain – The domain layer, containing domain entities, value objects, aggregates, and domain logic.
* People.Infrastructure – The infrastructure layer, providing implementations for data access, external services, and other technical concerns.
* People.Tests – Unit and integration tests for the application.
* People.Presentation – The presentation layer, containing client-side and server-side components.
  - people.presentation.client – The client-side user interface (React).
  - People.Presentation.Server – The server-side web API or backend for handling requests(.Net Core API).

## Folder Structure:

```
People/
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
│   ├── Client/
│   └── Server/
