# Use the official image with .NET SDK (with IIS Express support)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app

# Copy the csproj files and restore dependencies
COPY ["backend/WebAPI/WebAPI.csproj", "backend/WebAPI/"]
COPY ["backend/Application/Application.csproj", "backend/Application/"]
COPY ["backend/Domain/Domain.csproj", "backend/Domain/"]
COPY ["backend/Infrastructure/Infrastructure.csproj", "backend/Infrastructure/"]

RUN dotnet restore "backend/WebAPI/WebAPI.csproj"

# Copy the rest of the code
COPY . .

# Build the solution
WORKDIR /app/backend/WebAPI
RUN dotnet build "WebAPI.csproj" -c Release

# Publish the app (using the output directory)
RUN dotnet publish "WebAPI.csproj" -c Release -o /app/publish

# Use the base image with IIS Express
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /inetpub/wwwroot

# Install IIS Express on the container
RUN apt-get update && \
    apt-get install -y \
    libunwind8 \
    && rm -rf /var/lib/apt/lists/*

# Copy the published app from the build image to the IIS directory
COPY --from=build /app/publish .

# Expose the port that IIS Express will listen on
EXPOSE 80

# Start IIS Express to host the application
ENTRYPOINT ["dotnet", "WebAPI.dll"]
