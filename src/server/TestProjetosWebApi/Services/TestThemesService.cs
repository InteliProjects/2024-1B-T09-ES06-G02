using Moq;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Services;

namespace TestProjetosWebApi.Repositories
{
    public class TestThemesService
    {
        [Fact]
        public async Task GetAllThemesAsync_ShouldReturnAllThemes()
        {
            // Arrange
            var themesRepositoryMock = new Mock<IThemesRepository>();
            themesRepositoryMock.Setup(repo => repo.GetAllThemesAsync()).ReturnsAsync(GetTestThemes());

            var themesService = new ThemesService(themesRepositoryMock.Object);

            // Act
            var result = await themesService.GetAllThemesAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, ((List<Theme>)result).Count);
        }

        [Fact]
        public async Task GetThemeByIdAsync_ShouldReturnTheme()
        {
            // Arrange
            int themeId = 1;
            var theme = new Theme { id = themeId, name = "Test Theme", description = "Test Description" };

            var themesRepositoryMock = new Mock<IThemesRepository>();
            themesRepositoryMock.Setup(repo => repo.GetThemeByIdAsync(themeId)).ReturnsAsync(theme);

            var themesService = new ThemesService(themesRepositoryMock.Object);

            // Act
            var result = await themesService.GetThemeByIdAsync(themeId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(themeId, result.id);
        }

        [Fact]
        public async Task CreateThemeAsync_ShouldCreateTheme()
        {
            // Arrange
            var theme = new Theme { name = "New Theme", description = "New Description", created_at = DateTime.Now, updated_at = DateTime.Now };

            var themesRepositoryMock = new Mock<IThemesRepository>();
            themesRepositoryMock.Setup(repo => repo.CreateThemeAsync(theme));

            var themesService = new ThemesService(themesRepositoryMock.Object);

            // Act
            await themesService.CreateThemeAsync(theme);

            // Assert
            themesRepositoryMock.Verify(repo => repo.CreateThemeAsync(theme), Times.Once);
        }

        private List<Theme> GetTestThemes()
        {
            return new List<Theme>
            {
                new Theme { id = 1, name = "Theme 1", description = "Description 1", created_at = DateTime.Now, updated_at = DateTime.Now },
                new Theme { id = 2, name = "Theme 2", description = "Description 2", created_at = DateTime.Now, updated_at = DateTime.Now }
            };
        }
    }
}
