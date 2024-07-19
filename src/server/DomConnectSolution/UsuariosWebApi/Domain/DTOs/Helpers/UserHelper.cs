using AutoMapper;
using UsuariosWebApi.Domain.DTOs.Responses;
using UsuariosWebApi.Domain.DTOs.ViewModels;
using UsuariosWebApi.Domain.Entities;

namespace UsuariosWebApi.Domain.DTOs.Helpers
{
    public class UserHelper : Profile
    {
        public UserHelper()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<UserAddViewModel, User>();
            CreateMap<User, UserAddViewModel>();
            CreateMap<UserUpdateViewModel, User>();
            CreateMap<User, UserUpdateViewModel>();
        }
    }
}
