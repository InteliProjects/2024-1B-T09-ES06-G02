using ProjetosWebApi.Domain.Entities;


namespace ProjetosWebApi.Service.Interfaces
{
    public interface ISubThemesService
    {
        Task<IEnumerable<SubTheme>> GetAllSubThemesAsync();
        Task<SubTheme> GetSubThemeByIdAsync(int id);
        Task CreateSubThemeAsync(SubTheme subTheme);
    }
}
