using Moq;
using UsuariosWebApi.Domain.Entities;
using UsuariosWebApi.Infra.Data.Repository.Interfaces;
using UsuariosWebApi.Service.Services;

namespace TestUserWebApi.Repositories
{
    public class TestUserSubThemesService
    {
        [Fact]
        public async Task GetSubThemesByUserIDAsync_ReturnsSubThemesForGivenUserId()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var expectedSubThemes = new List<UserSubThemes>
            {
                new UserSubThemes { id = 1, user_id = userId, sub_theme_id = 1 },
                new UserSubThemes { id = 2, user_id = userId, sub_theme_id = 2 }
            };

            var userSubThemesRepositoryMock = new Mock<IUserSubThemesRepository>();
            userSubThemesRepositoryMock.Setup(repo => repo.GetSubThemesByUserIDAsync(userId)).ReturnsAsync(expectedSubThemes);

            var userSubThemesService = new UserSubThemesService(userSubThemesRepositoryMock.Object);

            // Act
            var actualSubThemes = await userSubThemesService.GetSubThemesByUserIdAsync(userId);

            // Assert
            Assert.Equal(expectedSubThemes, actualSubThemes);
        }

        [Fact]
        public async Task CreateSubThemesForUserAsync_CreatesSubThemesForUser()
        {
            // Arrange
            var subThemes = new UserSubThemes { user_id = Guid.NewGuid(), sub_theme_id = 1 };

            var userSubThemesRepositoryMock = new Mock<IUserSubThemesRepository>();

            var userSubThemesService = new UserSubThemesService(userSubThemesRepositoryMock.Object);

            // Act
            await userSubThemesService.CreateUserSubThemesAsync(subThemes);

            // Assert
            userSubThemesRepositoryMock.Verify(repo => repo.CreateUserSubThemesAsync(subThemes), Times.Once);
        }

        [Fact]
        public async Task UpdateSubThemesForUserAsync_UpdatesSubThemesForUser()
        {
            // Arrange
            var subThemes = new UserSubThemes { user_id = Guid.NewGuid(), sub_theme_id = 2 };

            var userSubThemesRepositoryMock = new Mock<IUserSubThemesRepository>();

            var userSubThemesService = new UserSubThemesService(userSubThemesRepositoryMock.Object);

            // Act
            await userSubThemesService.UpdateSubThemesForUserAsync(subThemes);

            // Assert
            userSubThemesRepositoryMock.Verify(repo => repo.UpdateSubThemesForUserAsync(subThemes), Times.Once);
        }
    }
}
