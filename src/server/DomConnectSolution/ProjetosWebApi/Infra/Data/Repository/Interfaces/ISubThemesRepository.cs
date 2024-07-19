using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Infra.Data.Repository.Interfaces
{
    public interface ISubThemesRepository
    {
        Task<IEnumerable<SubTheme>> GetAllSubThemesAsync();
        Task<SubTheme> GetSubThemeByIdAsync(int id);
        Task CreateSubThemeAsync(SubTheme subTheme);
    }
}
