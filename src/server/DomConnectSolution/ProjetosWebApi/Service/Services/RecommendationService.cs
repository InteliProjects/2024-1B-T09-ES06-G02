using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Service
{
    public class RecommendationService : IRecommendationService
    {
        private readonly IRecommendationRepository _recommendationRepository;

        public RecommendationService(IRecommendationRepository recommendationRepository)
        {
            _recommendationRepository = recommendationRepository;
        }

        

        public async Task<IEnumerable<Recommendation>> GetAllRecommendationsAsync(Guid userId)
        {
            return await _recommendationRepository.GetAllRecommendationsAsync(userId);
        }
        public async Task<IEnumerable<Recommendation>> GetRecommendationsDescAsync(Guid userId)
        {
            return await _recommendationRepository.GetRecommendationsDescAsync(userId);
        }
    }
}
