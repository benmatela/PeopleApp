# PeopleApp
# PeopleApp


SQL Table Design:

```bash
CREATE TABLE [People] (
    Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,  -- Set as primary key for uniqueness
    FirstName VARCHAR(255) NOT NULL,             -- Make sure FirstName is not NULL
    LastName VARCHAR(255) NOT NULL,              -- Make sure LastName is not NULL
    DateOfBirth DATETIME NOT NULL,               -- Make sure DateOfBirth is not NULL
    DateCreated DATETIME DEFAULT GETDATE() NOT NULL  -- Automatically set current date/time on record creation
);
```

PeopleManagementApp/
│
├── People.Presentation/        # React frontend (UI)
│   ├── src/
│   │   ├── components/         # UI components (e.g., Buttons, Forms)
│   │   ├── pages/              # Pages (e.g., Dashboard, People List)
│   │   ├── services/           # API services to communicate with backend
│   │   ├── App.tsx             # Main React component
│   │   ├── index.tsx           # Entry point for the frontend
│   │   └── vite.config.ts      # Vite configuration file
│   │
│   └── package.json            # Frontend dependencies
│
├── People.Domain/              # Domain logic, entities, and models
│   ├── Entities/               # Domain models (e.g., Person)
│   └── Interfaces/             # Interfaces for repository contracts
│
├── People.Application/         # Application services and use cases
│   ├── Services/               # Business logic and use case handlers
│   ├── Dtos/                   # Data Transfer Objects (DTOs)
│   └── Interfaces/             # Interfaces for communication with Infrastructure layer
│
└── People.Infrastructure/      # Data access, external services, and persistence
    ├── Repositories/           # Repositories to handle database queries
    ├── DataContext/            # Database context for Entity Framework Core
    ├── Migrations/             # Database migrations for EF Core
    ├── Api/                    # API controllers for the backend
    └── appsettings.json        # Configuration files for backend services


