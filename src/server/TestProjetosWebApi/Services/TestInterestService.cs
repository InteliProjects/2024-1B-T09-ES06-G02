using Moq;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Services;

namespace TestProjetosWebApi.Services
{
    public class TestInterestService
    {
        [Fact]
        public async Task GetAllInterestsById_ReturnsInterests()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var expectedInterests = new List<Interest>
            {
                new Interest { id = 1, user_id = userId, project_id = 1, interest_level = 3 },
                new Interest { id = 2, user_id = userId, project_id = 2, interest_level = 2 }
            };

            var interestRepositoryMock = new Mock<IInterestRepository>();
            interestRepositoryMock.Setup(repo => repo.GetAllInterestsById(userId))
                .ReturnsAsync(expectedInterests);

            var interestService = new InterestService(interestRepositoryMock.Object);

            // Act
            var interests = await interestService.GetAllInterestsById(userId);

            // Assert
            Assert.NotNull(interests);
            Assert.Equal(expectedInterests.Count, ((List<Interest>)interests).Count);
        }

        [Fact]
        public async Task CreateInterest_CreatesInterest()
        {
            // Arrange
            var interest = new Interest
            {
                id = 1,
                user_id = Guid.NewGuid(),
                project_id = 1,
                interest_level = 3
            };

            var interestRepositoryMock = new Mock<IInterestRepository>();
            interestRepositoryMock.Setup(repo => repo.CreateInterest(interest))
                .Returns(Task.CompletedTask);

            var interestService = new InterestService(interestRepositoryMock.Object);

            // Act
            await interestService.CreateInterest(interest);

            // Assert
            interestRepositoryMock.Verify(repo => repo.CreateInterest(interest), Times.Once);
        }
    }
}
