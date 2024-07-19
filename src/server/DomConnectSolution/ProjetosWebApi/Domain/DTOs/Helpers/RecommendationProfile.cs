using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.Entities;
using AutoMapper;
using ProjetosWebApi.Domain.DTOs.ViewModels;

namespace ProjetosWebApi.Domain.DTOs.Helpers
{
    public class RecommendationProfile : Profile
    {
        public RecommendationProfile()
        {
            CreateMap<Recommendation, RecommendationDTO>();
            CreateMap<RecommendationDTO, Recommendation>();
        }
    }
}