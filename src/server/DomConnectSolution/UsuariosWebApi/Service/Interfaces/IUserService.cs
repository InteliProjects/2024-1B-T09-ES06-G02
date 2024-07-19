using UsuariosWebApi.Domain.Entities;

namespace UsuariosWebApi.Service.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid userId);
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
    }
}
