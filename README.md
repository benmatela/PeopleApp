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
