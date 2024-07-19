using ProjetosWebApi.Domain.Entities;


namespace ProjetosWebApi.Service.Interfaces
{
    public interface IThemesService
    {
        Task<IEnumerable<Theme>> GetAllThemesAsync();
        Task<Theme> GetThemeByIdAsync(int id);
        Task CreateThemeAsync(Domain.Entities.Theme theme);
    }
}
