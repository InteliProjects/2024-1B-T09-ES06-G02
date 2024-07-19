using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Infra.Data.Repository.Interfaces
{
    public interface IProjectSubThemeRepository
    {
        Task<IEnumerable<ProjectSubtheme>> GetAllProjectSubThemesAsync();
        Task<IEnumerable<ProjectSubtheme>> GetAllProjectSubThemeByUserIdAsync(int projectId);
        Task<ProjectSubtheme> GetProjectSubThemesByIdAsync(int id);
        Task CreateProjectSubThemeAsync(ProjectSubtheme projectSubTheme);
        Task DeleteProjectSubThemesAsync(int id);
    }
}
