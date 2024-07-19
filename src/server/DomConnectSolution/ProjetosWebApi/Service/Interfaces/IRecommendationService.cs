using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Service.Interfaces
{
    public interface IRecommendationService
    {
        Task<IEnumerable<Recommendation>> GetAllRecommendationsAsync(Guid userId);
        Task<IEnumerable<Recommendation>> GetRecommendationsDescAsync(Guid userId);
    }
}
