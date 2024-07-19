using UsuariosWebApi.Domain.Entities;
using UsuariosWebApi.Infra.Data.Repository.Interfaces;
using UsuariosWebApi.Service.Interfaces;

namespace UsuariosWebApi.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return _userRepository.GetAllUsersAsync();
        }

        public Task<User> GetUserByIdAsync(Guid userId)
        {
            return _userRepository.GetUserByIdAsync(userId);
        }

        public Task CreateUserAsync(User user)
        {
            return _userRepository.CreateUserAsync(user);
        }

        public Task UpdateUserAsync(User user)
        {
            return _userRepository.UpdateUserAsync(user);
        }
    }
}
