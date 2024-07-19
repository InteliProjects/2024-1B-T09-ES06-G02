using UsuariosWebApi.Domain.Entities;

namespace UsuariosWebApi.Infra.Data.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid userId);
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
    }
}
