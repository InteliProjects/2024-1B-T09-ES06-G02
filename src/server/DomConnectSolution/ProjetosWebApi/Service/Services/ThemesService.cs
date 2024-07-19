using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Service.Services
{
    public class ThemesService : IThemesService
    {
        private readonly IThemesRepository _themesRepository;

        public ThemesService(IThemesRepository themesRepository)
        {
            _themesRepository = themesRepository;
        }

        public async Task<IEnumerable<Theme>> GetAllThemesAsync()
        {
            return await _themesRepository.GetAllThemesAsync();
        }

        public async Task<Theme> GetThemeByIdAsync(int id)
        {
            return await _themesRepository.GetThemeByIdAsync(id);
        }

        public async Task CreateThemeAsync(Theme theme)
        {
            await _themesRepository.CreateThemeAsync(theme);
        }
    }
}
