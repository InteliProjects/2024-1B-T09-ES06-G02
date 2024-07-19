using Microsoft.EntityFrameworkCore;
using UsuariosWebApi.Infra.Data.Context;
using UsuariosWebApi.Infra.Data.Repository.Interfaces;
using UsuariosWebApi.Infra.Data.Repository.Repositories;
using UsuariosWebApi.Service.Interfaces;
using UsuariosWebApi.Service.Services;
using System.Reflection;
using UsuariosWebApi.RabbitMQ.Interfaces;
using UsuariosWebApi.RabbitMQ.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddDbContext<DatabaseContext>(options =>
{
    var configuration = builder.Configuration;
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add RabbitMQService  
builder.Services.AddScoped<IRabbitMQService, RabbitMQService>();

// Add User repositories and services
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

// Add UserSubThemes repositories and services
builder.Services.AddScoped<IUserSubThemesRepository, UserSubThemesRepository>();
builder.Services.AddScoped<IUserSubThemesService, UserSubThemesService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapControllers();

app.Run();