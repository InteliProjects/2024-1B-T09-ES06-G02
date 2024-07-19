using Moq;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Services;

namespace TestProjetosWebApi.Services
{
    public class TestProjetosService
    {
        [Fact]
        public async Task GetAllProjetosAsync_ReturnsAllProjetos()
        {
            // Arrange
            var expectedProjetos = new List<Project>
            {
                new Project { id = 1, name = "Projeto1", description = "Descrição do Projeto 1" },
                new Project { id = 2, name = "Projeto2", description = "Descrição do Projeto 2" }
            };

            var projetoRepositoryMock = new Mock<IProjectRepository>();
            projetoRepositoryMock.Setup(repo => repo.GetAllProjectAsync()).ReturnsAsync(expectedProjetos);

            var projetosService = new ProjectService(projetoRepositoryMock.Object);

            // Act
            var actualProjetos = await projetosService.GetAllProjectAsync();

            // Assert
            Assert.Equal(expectedProjetos, actualProjetos);
        }

        [Fact]
        public async Task GetProjetoByIdAsync_ReturnsProjeto()
        {
            // Arrange
            var projectId = 1;
            var expectedProjeto = new Project { id = projectId, name = "Projeto1", description = "Descrição do Projeto 1" };

            var projetoRepositoryMock = new Mock<IProjectRepository>();
            projetoRepositoryMock.Setup(repo => repo.GetProjectByIdAsync(projectId)).ReturnsAsync(expectedProjeto);

            var projetosService = new ProjectService(projetoRepositoryMock.Object);

            // Act
            var actualProjeto = await projetosService.GetProjectByIdAsync(projectId);

            // Assert
            Assert.Equal(expectedProjeto, actualProjeto);
        }

        [Fact]
        public async Task CreateProjetoAsync_CreatesProjeto()
        {
            // Arrange
            var projetoToCreate = new Project
            {
                name = "NovoProjeto",
                description = "Nova Descrição",
                created_at = DateTime.Now,
                updated_at = DateTime.Now
            };

            var projetoRepositoryMock = new Mock<IProjectRepository>();
            projetoRepositoryMock.Setup(repo => repo.CreateProjectAsync(projetoToCreate)).Returns(Task.CompletedTask);

            var projetosService = new ProjectService(projetoRepositoryMock.Object);

            // Act
            await projetosService.CreateProjectAsync(projetoToCreate);

            // Assert
            projetoRepositoryMock.Verify(repo => repo.CreateProjectAsync(projetoToCreate), Times.Once);
        }
    }
}
