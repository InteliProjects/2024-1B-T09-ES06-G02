
using AutoMapper;
using UsuariosWebApi.Domain.DTOs.Responses;
using UsuariosWebApi.Domain.DTOs.ViewModels;
using UsuariosWebApi.Domain.Entities;

namespace UsuariosWebApi.Domain.DTOs.Helpers
{
    public class UserSubThemesProfile : Profile

    {
        public UserSubThemesProfile()
        {
            CreateMap<UserSubThemesAddViewModel, UserSubThemes>();
            CreateMap<UserSubThemes, UserSubThemesAddViewModel>();
            CreateMap<UserSubThemesDto, UserSubThemes>();
            CreateMap<UserSubThemes, UserSubThemesDto>();
        }

    }
}
