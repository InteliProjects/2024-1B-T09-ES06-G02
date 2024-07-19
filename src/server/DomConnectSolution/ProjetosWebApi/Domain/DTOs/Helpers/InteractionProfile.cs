using AutoMapper;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.DTOs.ViewModels;
using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Domain.DTOs.Helpers
{
    public class InteractionProfile : Profile
    {
        public InteractionProfile()
        {
            CreateMap<InteractionDto, Interaction>();
            CreateMap<Interaction, InteractionDto>();
            CreateMap<InteractionAddViewModel, Interaction>();
            CreateMap<Interaction, InteractionAddViewModel>();
        }
    }
}
