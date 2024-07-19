using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Infra.Data.Repository.Interfaces
{
    public interface IThemesRepository
    {
        Task<IEnumerable<Theme>> GetAllThemesAsync();
        Task<Theme> GetThemeByIdAsync(int id);
        Task CreateThemeAsync(Theme theme);
    }
}
