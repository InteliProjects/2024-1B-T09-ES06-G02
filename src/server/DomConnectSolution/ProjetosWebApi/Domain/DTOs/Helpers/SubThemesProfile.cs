using AutoMapper;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.DTOs.ViewModels;
using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Domain.DTOs.Helpers
{
    public class SubThemesProfile : Profile
    {
        public SubThemesProfile()
        {
            CreateMap<SubTheme, SubThemeDto>();
            CreateMap<SubTheme, SubThemeDto>();
            CreateMap<SubThemeAddViewModel, SubTheme>();
            CreateMap<SubThemeDto, SubThemeAddViewModel>();

        }
    }
}
