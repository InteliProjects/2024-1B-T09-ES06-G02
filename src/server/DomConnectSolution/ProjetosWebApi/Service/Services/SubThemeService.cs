using AutoMapper;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Service.Services
{
    public class SubThemesService : ISubThemesService
    {
        private readonly IMapper _mapper;
        private readonly ISubThemesRepository _subThemesRepository;

        public SubThemesService(IMapper mapper, ISubThemesRepository subThemesRepository)
        {
            _mapper = mapper;
            _subThemesRepository = subThemesRepository;
        }

        public async Task<IEnumerable<SubTheme>> GetAllSubThemesAsync()
        {
            return await _subThemesRepository.GetAllSubThemesAsync();
        }

        public async Task<SubTheme> GetSubThemeByIdAsync(int id)
        {
            return await _subThemesRepository.GetSubThemeByIdAsync(id);
        }

        public async Task CreateSubThemeAsync(SubTheme subTheme)
        {
            await _subThemesRepository.CreateSubThemeAsync(subTheme);
        }
    }
}
