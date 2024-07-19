using Moq;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service;

namespace TestProjetosWebApi.Repositories
{
    public class TestRecommendationService
    {
        [Fact]
        public async Task GetAllRecommendationsAsync_ReturnsRecommendationsForGivenUserId()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var expectedRecommendations = new List<Recommendation>
            {
                new Recommendation { id = 1, user_id = userId, project_id = 1, result = 0.9f },
                new Recommendation { id = 2, user_id = userId, project_id = 2, result = 0.8f }
            };

            var recommendationRepositoryMock = new Mock<IRecommendationRepository>();
            recommendationRepositoryMock.Setup(repo => repo.GetAllRecommendationsAsync(userId)).ReturnsAsync(expectedRecommendations);

            var recommendationService = new RecommendationService(recommendationRepositoryMock.Object);

            // Act
            var actualRecommendations = await recommendationService.GetAllRecommendationsAsync(userId);

            // Assert
            Assert.Equal(expectedRecommendations, actualRecommendations);
        }
    }
}
