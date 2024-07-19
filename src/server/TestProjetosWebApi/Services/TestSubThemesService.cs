using AutoMapper;
using Moq;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Services;

namespace TestProjetosWebApi.Repositories
{
    public class TestSubThemesService
    {
        [Fact]
        public async Task GetAllSubThemesAsync_ShouldReturnAllSubThemes()
        {
            // Arrange
            var subThemesRepositoryMock = new Mock<ISubThemesRepository>();
            subThemesRepositoryMock.Setup(repo => repo.GetAllSubThemesAsync()).ReturnsAsync(GetTestSubThemes());

            var mapperMock = new Mock<IMapper>();

            var subThemesService = new SubThemesService(mapperMock.Object, subThemesRepositoryMock.Object);

            // Act
            var result = await subThemesService.GetAllSubThemesAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, ((List<SubTheme>)result).Count);
        }

        [Fact]
        public async Task GetSubThemeByIdAsync_ShouldReturnSubTheme()
        {
            // Arrange
            int subThemeId = 1;
            var subTheme = new SubTheme { id = subThemeId, name = "Test SubTheme", description = "Test Description" };

            var subThemesRepositoryMock = new Mock<ISubThemesRepository>();
            subThemesRepositoryMock.Setup(repo => repo.GetSubThemeByIdAsync(subThemeId)).ReturnsAsync(subTheme);

            var mapperMock = new Mock<IMapper>();

            var subThemesService = new SubThemesService(mapperMock.Object, subThemesRepositoryMock.Object);

            // Act
            var result = await subThemesService.GetSubThemeByIdAsync(subThemeId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(subThemeId, result.id);
        }

        [Fact]
        public async Task CreateSubThemeAsync_ShouldCreateSubTheme()
        {
            // Arrange
            var subTheme = new SubTheme { name = "New SubTheme", description = "New Description", theme_id = 1, created_at = DateTime.Now, updated_at = DateTime.Now };

            var subThemesRepositoryMock = new Mock<ISubThemesRepository>();
            subThemesRepositoryMock.Setup(repo => repo.CreateSubThemeAsync(subTheme));

            var mapperMock = new Mock<IMapper>();

            var subThemesService = new SubThemesService(mapperMock.Object, subThemesRepositoryMock.Object);

            // Act
            await subThemesService.CreateSubThemeAsync(subTheme);

            // Assert
            subThemesRepositoryMock.Verify(repo => repo.CreateSubThemeAsync(subTheme), Times.Once);
        }

        private List<SubTheme> GetTestSubThemes()
        {
            return new List<SubTheme>
            {
                new SubTheme { id = 1, name = "SubTheme 1", description = "Description 1", theme_id = 1, created_at = DateTime.Now, updated_at = DateTime.Now },
                new SubTheme { id = 2, name = "SubTheme 2", description = "Description 2", theme_id = 2, created_at = DateTime.Now, updated_at = DateTime.Now }
            };
        }
    }
}
