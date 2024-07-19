using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data;

namespace ProjetosWebApi.Infra.Data.Context
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string? _connectionString;

        public DatabaseContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }
        public IDbConnection Connect() => new NpgsqlConnection(_connectionString);
    }
}
