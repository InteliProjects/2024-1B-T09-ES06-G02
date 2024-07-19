using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Infra.Data.Repository.Interfaces
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllProjectAsync();
        Task<Project> GetProjectByIdAsync(int id);
        Task<IEnumerable<ProjectsThemeDto>> GetProjectsWithThemeAsync();
        Task CreateProjectAsync(Project project);
        Task UpdateProjectAsync(Project project);
        Task<IEnumerable<Project>> GetProjectsBySubThemesAsync(IEnumerable<int> subThemeIds);
    }
}
