using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Service.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<IEnumerable<Project>> GetAllProjectAsync()
        {
            return await _projectRepository.GetAllProjectAsync();
        }

        public async Task<Project> GetProjectByIdAsync(int id)
        {
            return await _projectRepository.GetProjectByIdAsync(id);
        }

        public async Task<IEnumerable<ProjectsThemeDto>> GetProjectsWithThemeAsync()
        {
            return await _projectRepository.GetProjectsWithThemeAsync();
        }

        public async Task CreateProjectAsync(Project project)
        {
            await _projectRepository.CreateProjectAsync(project);
        }
        public async Task UpdateProjectAsync(Project project)
        {
            await _projectRepository.UpdateProjectAsync(project);
        }
        public async Task<IEnumerable<Project>> GetProjectsBySubThemesAsync(IEnumerable<int> subThemeIds)
        {
            return await _projectRepository.GetProjectsBySubThemesAsync(subThemeIds);
        }
    }
}
