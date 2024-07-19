using UsuariosWebApi.Domain.Entities;


namespace UsuariosWebApi.Service.Interfaces
{
    public interface IUserSubThemesService
    {
        Task<UserSubThemes> GetUserSubThemesByIdAsync(int id);
        Task<IEnumerable<UserSubThemes>> GetSubThemesByUserIdAsync(Guid userId);
        Task CreateUserSubThemesAsync(UserSubThemes subThemes);
        Task UpdateSubThemesForUserAsync(UserSubThemes subThemes);
        Task DeleteUserSubThemesAsync(int id);
    }
}
