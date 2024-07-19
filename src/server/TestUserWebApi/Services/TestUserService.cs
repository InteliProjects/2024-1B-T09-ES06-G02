using Microsoft.AspNetCore.Mvc;
using Moq;
using ProjetosWebApi.Application.Controllers;
using ProjetosWebApi.Domain.Entities;
using UsuariosWebApi.Domain.DTOs.Responses;
using UsuariosWebApi.Domain.Entities;
using UsuariosWebApi.Infra.Data.Repository.Interfaces;
using UsuariosWebApi.RabbitMQ.Interfaces;
using UsuariosWebApi.Service.Services;

namespace TestUserWebApi.Repositories
{
    public class TestUserService
    {
        [Fact]
        public async Task GetAllUsersAsync_ReturnsAllUsers()
        {   
            // Arrange
            var expectedUsers = new List<User>
            {
                new User { uuid = Guid.NewGuid(), name = "User1" },
                new User { uuid = Guid.NewGuid(), name = "User2" }
            };

            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(repo => repo.GetAllUsersAsync()).ReturnsAsync(expectedUsers);

            var userService = new UserService(userRepositoryMock.Object);

            // Act
            var actualUsers = await userService.GetAllUsersAsync();

            // Assert
            Assert.Equal(expectedUsers, actualUsers);
        }

        [Fact]
        public async Task GetUserByIdAsync_ReturnsUser()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var expectedUser = new User { uuid = userId, name = "TestUser" };

            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(repo => repo.GetUserByIdAsync(userId)).ReturnsAsync(expectedUser);

            var userService = new UserService(userRepositoryMock.Object);

            // Act
            var actualUser = await userService.GetUserByIdAsync(userId);

            // Assert
            Assert.Equal(expectedUser, actualUser);
        }

        [Fact]
        public async Task CreateUserAsync_CreatesUser()
        {
            // Arrange
            var userToCreate = new User
            {
                name = "NewUser",
                job_title = "Developer",
                enterprise = "XYZ Company",
                cpf = "123456789",
                photo_path = "path/to/photo",
                created_at = DateTime.Now,
                updated_at = DateTime.Now
            };

            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(repo => repo.CreateUserAsync(userToCreate)).Returns(Task.CompletedTask);

            var userService = new UserService(userRepositoryMock.Object);

            // Act
            await userService.CreateUserAsync(userToCreate);

            // Assert
            userRepositoryMock.Verify(repo => repo.CreateUserAsync(userToCreate), Times.Once);
        }

        [Fact]
        public async Task UpdateUserAsync_UpdatesUser()
        {
            // Arrange
            var userToUpdate = new User
            {
                uuid = Guid.NewGuid(),
                name = "UpdatedUser",
                job_title = "Senior Developer",
                enterprise = "ABC Company",
                cpf = "987654321",
                photo_path = "path/to/updated/photo",
                created_at = DateTime.Now.AddDays(-1),
                updated_at = DateTime.Now
            };

            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(repo => repo.UpdateUserAsync(userToUpdate)).Returns(Task.CompletedTask);

            var userService = new UserService(userRepositoryMock.Object);

            // Act
            await userService.UpdateUserAsync(userToUpdate);

            // Assert
            userRepositoryMock.Verify(repo => repo.UpdateUserAsync(userToUpdate), Times.Once);
        }

        [Fact]
        public async Task RunRecommendationModel_ReturnsOk()
        {
            // Arrange
            var mockRabbitmqService = new Mock<IRabbitmqService>();
            var controller = new RecommendationController(mockRabbitmqService.Object);

            var recommendationInputDto = new RecommendationInputDto
            {
                user_id = 1,
                interests = new List<Interest>
                {
                    new Interest { id = 1, user_id = 1, project_id = 1, interest_level = 5 },
                    new Interest { id = 2, user_id = 1, project_id = 2, interest_level = 3 }
                }
            };

            // Act
            var result = await controller.RunRecommendationModel(recommendationInputDto);

            // Assert
            var okResult = Assert.IsType<OkResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }
    }

}
}
