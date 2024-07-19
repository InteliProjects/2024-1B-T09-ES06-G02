using Dapper;
using UsuariosWebApi.Domain.DTOs.Responses;
using UsuariosWebApi.Domain.Entities;
using UsuariosWebApi.Infra.Data.Context;
using UsuariosWebApi.Infra.Data.Repository.Interfaces;
using UsuariosWebApi.RabbitMQ.Services;

namespace UsuariosWebApi.Infra.Data.Repository.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;

        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            using var db = _context.Connect();
            IEnumerable<User> users = await db.QueryAsync<User>(
                @"SELECT * FROM users"
                );

            if (users == null)
            {
                throw new Exception("Usuários não existem");
            }

            return users;
        }

        public async Task<User> GetUserByIdAsync(Guid userId)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = userId
            };

            User? user = await db.QueryFirstOrDefaultAsync<User>(
                @"SELECT * FROM users 
                  WHERE uuid = @UserId",
                parameters
            );

            if (user == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            return user;
        }

        public async Task CreateUserAsync(User user)
        {
            //enviar informações do tipo RecommendationInputDto para função SendMessage

            using var db = _context.Connect();

            var parameters = new
            {
                Name = user.name,
                JobTitle = user.job_title,
                Enterprise = user.enterprise,
                Cpf = user.cpf,
                PhotoPath = user.photo_path
            };

            await db.ExecuteAsync(
                @"INSERT INTO users (name, job_title, enterprise, cpf, photo_path)
                  VALUES (@Name, @JobTitle, @Enterprise, @Cpf, @PhotoPath)",
                parameters
                );
        }

        public async Task UpdateUserAsync(User user)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Name = user.name,
                JobTitle = user.job_title,
                Enterprise = user.enterprise,
                Cpf = user.cpf,
                PhotoPath = user.photo_path,
                UpdatedAt = DateTime.UtcNow,
                uuid = user.uuid
            };

            await db.ExecuteAsync(
                @"UPDATE users 
                  SET name = @Name, job_title = @JobTitle, enterprise = @Enterprise, 
                      cpf = @Cpf, photo_path = @PhotoPath, updated_at = @UpdatedAt 
                  WHERE uuid = @uuid",
                parameters
            );
        }
    }
}
