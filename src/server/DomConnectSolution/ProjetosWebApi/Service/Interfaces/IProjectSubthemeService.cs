using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Service.Interfaces
{
    public interface IProjectSubThemeService
    {
        Task<IEnumerable<ProjectSubtheme>> GetAllProjectSubThemesAsync();
        Task<IEnumerable<ProjectSubtheme>> GetAllProjectSubThemeByUserIdAsync(int projectId);
        Task<ProjectSubtheme> GetProjectSubThemesByIdAsync(int id);
        Task CreateProjectSubThemeAsync(ProjectSubtheme projectSubthemeData);
        Task DeleteProjectSubThemesAsync(int id);
    }
}
