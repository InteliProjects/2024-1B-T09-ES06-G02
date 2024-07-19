using AutoMapper;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.DTOs.ViewModels;
using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Domain.DTOs.Helpers
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<ProjectAddViewModel, Project>();
            CreateMap<Project, ProjectAddViewModel>();
            CreateMap<ProjectUpdateViewModel, Project>();
            CreateMap<Project, ProjectUpdateViewModel>();
            CreateMap<ProjectDto, Project>();
            CreateMap<Project, ProjectDto>();
        }
    }
}
