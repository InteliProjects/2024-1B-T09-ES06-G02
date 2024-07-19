using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Infra.Data.Repository.Interfaces
{
    public interface IRecommendationRepository
    {
        Task<IEnumerable<Recommendation>> GetAllRecommendationsAsync(Guid userId);
        Task<IEnumerable<Recommendation>> GetRecommendationsDescAsync(Guid userId);
    }
}
