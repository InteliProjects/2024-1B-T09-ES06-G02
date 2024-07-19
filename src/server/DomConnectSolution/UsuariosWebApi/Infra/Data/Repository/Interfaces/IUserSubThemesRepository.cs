using UsuariosWebApi.Domain.Entities;

namespace UsuariosWebApi.Infra.Data.Repository.Interfaces
{
    public interface IUserSubThemesRepository
    {
        Task<UserSubThemes> GetUserSubThemesByIdAsync(int subThemeId);
        Task<IEnumerable<UserSubThemes>> GetSubThemesByUserIDAsync(Guid userId);
        Task CreateUserSubThemesAsync(UserSubThemes userSubThemes);
        Task UpdateSubThemesForUserAsync(UserSubThemes subThemes);
        Task DeleteUserSubThemesAsync(int id);
    }
}
