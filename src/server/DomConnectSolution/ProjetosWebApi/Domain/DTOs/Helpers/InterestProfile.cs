using AutoMapper;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.DTOs.ViewModels;
using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Domain.DTOs.Helpers
{
    public class InterestProfile : Profile
    {
        public InterestProfile()
        {
            CreateMap<InterestAddViewModel, Interest>();
            CreateMap<Interest, InterestAddViewModel>();
            CreateMap<InterestDto, Interest>();
            CreateMap<Interest, InterestDto>();
        }
    }
}
