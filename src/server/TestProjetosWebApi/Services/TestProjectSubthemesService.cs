using Moq;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Services;

namespace TestProjetosWebApi.Repositories
{
    public class TestProjectSubthemesService
    {
        [Fact]
        public async Task AddProject_sub_theme_Success()
        {
            // Arrange
            var projectSubtheme = new ProjectSubtheme
            {
                project_id = 1,
                sub_theme_id = 2
            };

            var projectSubthemeRepositoryMock = new Mock<IProjectSubThemeRepository>();
            projectSubthemeRepositoryMock.Setup(repo => repo.CreateProjectSubThemeAsync(It.IsAny<ProjectSubtheme>())).Returns(Task.CompletedTask);

            var projectSubthemeService = new ProjectSubThemeService(projectSubthemeRepositoryMock.Object);

            // Act
            await projectSubthemeService.CreateProjectSubThemeAsync(projectSubtheme);

            // Assert
            projectSubthemeRepositoryMock.Verify(repo => repo.CreateProjectSubThemeAsync(projectSubtheme), Times.Once);
        }
    }
}
