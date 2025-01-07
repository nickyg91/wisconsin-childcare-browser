FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/*
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["wi-childcare-client", "wi-childcare-client"]
COPY ["wisconsin-dhs-dotnet", "dotnet"]
RUN dotnet restore "dotnet/WisconsinDhs.Web/WisconsinDhs.Web.csproj"
COPY . .
WORKDIR "/src/dotnet/WisconsinDhs.Web"
RUN dotnet build "WisconsinDhs.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "WisconsinDhs.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WisconsinDhs.Web.dll"]
