using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Service.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjectAsync();
        Task<Project> GetProjectByIdAsync(int id);
        Task<IEnumerable<ProjectsThemeDto>> GetProjectsWithThemeAsync();
        Task<IEnumerable<Project>> GetProjectsBySubThemesAsync(IEnumerable<int> subThemeIds);
        Task CreateProjectAsync(Project project);
        Task UpdateProjectAsync(Project project);
    }
}
