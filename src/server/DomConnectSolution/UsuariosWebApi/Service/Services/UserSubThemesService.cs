using UsuariosWebApi.Domain.Entities;
using UsuariosWebApi.Infra.Data.Repository.Interfaces;
using UsuariosWebApi.Service.Interfaces;

namespace UsuariosWebApi.Service.Services
{
    public class UserSubThemesService : IUserSubThemesService
    {
        private readonly IUserSubThemesRepository _userSubThemesRepository;

        public UserSubThemesService(IUserSubThemesRepository userSubThemesRepository)
        {
            _userSubThemesRepository = userSubThemesRepository;
        }

        public async Task<UserSubThemes> GetUserSubThemesByIdAsync(int id)
        {
            return await _userSubThemesRepository.GetUserSubThemesByIdAsync(id);
        }

        public async Task<IEnumerable<UserSubThemes>> GetSubThemesByUserIdAsync(Guid userId)
        {
            return await _userSubThemesRepository.GetSubThemesByUserIDAsync(userId);
        }

        public async Task CreateUserSubThemesAsync(UserSubThemes subThemes)
        {
            await _userSubThemesRepository.CreateUserSubThemesAsync(subThemes);
        }

        public async Task UpdateSubThemesForUserAsync(UserSubThemes subThemes)
        {
            await _userSubThemesRepository.UpdateSubThemesForUserAsync(subThemes);
        }
        public async Task DeleteUserSubThemesAsync(int id)
        {
            await _userSubThemesRepository.DeleteUserSubThemesAsync(id);
        }
    }
}
