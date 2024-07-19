using AutoMapper;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.DTOs.ViewModels;
using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Domain.DTOs.Helpers
{
    public class ProjectSubthemeProfile : Profile
    {
        public ProjectSubthemeProfile()
        {
            CreateMap<ProjectSubthemeAddViewModel, ProjectSubtheme>();
            CreateMap<ProjectSubtheme, ProjectSubthemeAddViewModel>();
            CreateMap<ProjectSubThemeDto, ProjectSubtheme>();
            CreateMap<ProjectSubtheme, ProjectSubThemeDto>();
        }
    }
}
