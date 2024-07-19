using Microsoft.EntityFrameworkCore;
using ProjetosWebApi.Infra.Data.Context;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Infra.Data.Repository.Repositories;
using ProjetosWebApi.Service;
using ProjetosWebApi.Service.Interfaces;
using ProjetosWebApi.Service.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Add DbContext and connection string
builder.Services.AddDbContext<DatabaseContext>((serviceProvider, options) =>
{
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
});

// Add repositories and services
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IProjectService, ProjectService>();

// Add themes repositories and services
builder.Services.AddScoped<IThemesRepository, ThemesRepository>();
builder.Services.AddScoped<IThemesService, ThemesService>();

// Add subthemes repositories and services
builder.Services.AddScoped<ISubThemesRepository, SubThemesRepository>();
builder.Services.AddScoped<ISubThemesService, SubThemesService>();

// Add interaction repositories and services
builder.Services.AddScoped<IInteractionRepository, InteractionRepository>();
builder.Services.AddScoped<IInteractionService, InteractionService>();

// Add recommendation repositories and services
builder.Services.AddScoped<IRecommendationRepository, RecommendationRepository>();
builder.Services.AddScoped<IRecommendationService, RecommendationService>();

// Add projectSubTheme repositories and services
builder.Services.AddScoped<IProjectSubThemeRepository, ProjectSubThemeRepository>();
builder.Services.AddScoped<IProjectSubThemeService, ProjectSubThemeService>();

// Add interest repositories and services
builder.Services.AddScoped<IInterestService, InterestService>();
builder.Services.AddScoped<IInterestRepository, InterestRepository>();

// Configure HttpClient for Users service
builder.Services.AddHttpClient("usuarios-service", c =>
{
    c.BaseAddress = new Uri("http://usuarios-api:8080");
});

// Configure CORS to allow communication between different services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

// Use CORS policy
app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();
