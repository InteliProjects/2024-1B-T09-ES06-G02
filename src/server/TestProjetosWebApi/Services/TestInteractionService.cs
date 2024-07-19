using Moq;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Domain.Enumerations;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Services;

namespace TestProjetosWebApi.Services
{
    public class TestInteractionService
    {
        [Fact]
        public async Task GetInteractionsByUserIdAsync_ReturnsInteractions()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var expectedInteractions = new List<Interaction>
            {
                new Interaction { id = 1, user_id = userId, project_id = 1, interaction = EnumInteraction.Favoritado },
                new Interaction { id = 2, user_id = userId, project_id = 2, interaction = EnumInteraction.SinergiaAprendizagem }
            };

            var interactionRepositoryMock = new Mock<IInteractionRepository>();
            interactionRepositoryMock.Setup(repo => repo.GetInteractionsByUserIdAsync(userId))
                .ReturnsAsync(expectedInteractions);

            var interactionService = new InteractionService(interactionRepositoryMock.Object);

            // Act
            var interactions = await interactionService.GetInteractionsByUserIdAsync(userId);

            // Assert
            Assert.NotNull(interactions);
            Assert.Equal(expectedInteractions.Count, ((List<Interaction>)interactions).Count);
        }

        [Fact]
        public async Task CreateInteractionAsync_CreatesInteraction()
        {
            // Arrange
            var interaction = new Interaction
            {
                id = 1,
                user_id = Guid.NewGuid(),
                project_id = 1,
                interaction = EnumInteraction.Favoritado
            };

            var interactionRepositoryMock = new Mock<IInteractionRepository>();
            interactionRepositoryMock.Setup(repo => repo.CreateInteractionAsync(interaction))
                .Returns(Task.CompletedTask);

            var interactionService = new InteractionService(interactionRepositoryMock.Object);

            // Act
            await interactionService.CreateInteractionAsync(interaction);

            // Assert
            interactionRepositoryMock.Verify(repo => repo.CreateInteractionAsync(interaction), Times.Once);
        }
    }
}
