using Dapper;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Context;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;

namespace ProjetosWebApi.Infra.Data.Repository.Repositories
{
    public class RecommendationRepository : IRecommendationRepository
    {
        private readonly DatabaseContext _context;
        public RecommendationRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Recommendation>> GetAllRecommendationsAsync(Guid userId)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = userId,
            };

            IEnumerable<Recommendation> recommendationResponse = await db.QueryAsync<Recommendation>(
                @"SELECT p.*
                FROM Projects p
                JOIN Recommendations r ON p.id = r.project_id
                WHERE r.user_id = @UserId
                ORDER BY r.result DESC
                LIMIT 1;",
                parameters
                );

            if (recommendationResponse == null)
            {
                throw new Exception("Recomendações não encontradas.");
            }

            return recommendationResponse;
        }

        public async Task<IEnumerable<Recommendation>> GetRecommendationsDescAsync(Guid userId)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = userId,
            };

            IEnumerable<Recommendation> recommendationResponse = await db.QueryAsync<Recommendation>(
                @"SELECT r.*
               FROM Recommendations r
               WHERE r.user_id = @UserId
               ORDER BY r.result DESC;",
                parameters
                );

            if (recommendationResponse == null || !recommendationResponse.Any())
            {
                throw new Exception("Recomendações não encontradas.");
            }

            return recommendationResponse;
        }
    }
}
