using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Application.Controllers
{
    [Route("api/recommendation")]
    [ApiController]
    public class RecommendationController : Controller
    {

        private readonly IMapper _mapper;
        private readonly IRecommendationService _recommendationService;

        public RecommendationController(IMapper mapper, IRecommendationService recommendationService)
        {
            _mapper = mapper;
            _recommendationService = recommendationService;
        }

        [HttpGet("topfive/{userId:Guid}")]
        public async Task<ActionResult<IEnumerable<RecommendationDTO>>> GetTopFiveRecommendations(Guid userId)
        {
            IEnumerable<Recommendation> recommendations = await _recommendationService.GetAllRecommendationsAsync(userId);

            IEnumerable<RecommendationDTO> recommendationsResponse = _mapper.Map<IEnumerable<RecommendationDTO>>(recommendations);

            return Ok(recommendationsResponse);
        }

        [HttpGet("{userId:Guid}")]
        public async Task<ActionResult<IEnumerable<RecommendationDTO>>> GetRecommendationsDesc(Guid userId)
        {
            IEnumerable<Recommendation> recommendations = await _recommendationService.GetRecommendationsDescAsync(userId);

            IEnumerable<RecommendationDTO> recommendationsResponse = _mapper.Map<IEnumerable<RecommendationDTO>>(recommendations);

            return Ok(recommendationsResponse);
        }

        // post de recomendação
    }
}
