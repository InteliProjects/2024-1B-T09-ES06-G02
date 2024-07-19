using AutoMapper;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.DTOs.ViewModels;
using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Domain.DTOs.Helpers
{
    public class ThemesProfile : Profile
    {
        public ThemesProfile()
        {
            CreateMap<ThemeDto, Theme>();
            CreateMap<Theme, ThemeDto>();
            CreateMap<ThemeAddViewModel, Theme>();
            CreateMap<ThemeDto, ThemeAddViewModel>();
        }
    }
}
