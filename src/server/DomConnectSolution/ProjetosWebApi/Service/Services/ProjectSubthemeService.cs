using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Service.Services
{
    public class ProjectSubThemeService : IProjectSubThemeService
    {
        private readonly IProjectSubThemeRepository _projectSubThemeRepository;

        public ProjectSubThemeService(IProjectSubThemeRepository projectSubthemeRepository)
        {
            _projectSubThemeRepository = projectSubthemeRepository;
        }

        public async Task<IEnumerable<ProjectSubtheme>> GetAllProjectSubThemesAsync()
        {
            return await _projectSubThemeRepository.GetAllProjectSubThemesAsync();
        }

        public async Task<IEnumerable<ProjectSubtheme>> GetAllProjectSubThemeByUserIdAsync(int projectId)
        {
            return await _projectSubThemeRepository.GetAllProjectSubThemeByUserIdAsync(projectId);
        }

        public async Task<ProjectSubtheme> GetProjectSubThemesByIdAsync(int id)
        {

            return await _projectSubThemeRepository.GetProjectSubThemesByIdAsync(id);
        }

        public async Task CreateProjectSubThemeAsync(ProjectSubtheme projectSubTheme)
        {
            await _projectSubThemeRepository.CreateProjectSubThemeAsync(projectSubTheme);
        }

        public async Task DeleteProjectSubThemesAsync(int id)
        {
            await _projectSubThemeRepository.DeleteProjectSubThemesAsync(id);
        }
    }
}
