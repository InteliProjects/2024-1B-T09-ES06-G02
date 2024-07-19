using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UsuariosWebApi.Domain.DTOs.Responses;
using UsuariosWebApi.Domain.DTOs.ViewModels;
using UsuariosWebApi.Domain.Entities;
using UsuariosWebApi.Service.Interfaces;
using UsuariosWebApi.RabbitMQ.Interfaces;
using ProjetosWebApi.Domain.Entities;

namespace UsuariosWebApi.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IRabbitMQService _rabbitmqService;

        public UserController(IMapper mapper, IUserService userService, IRabbitMQService rabbitMQService)
        {
            _mapper = mapper;
            _userService = userService;
            _rabbitmqService = rabbitMQService;
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetAllUsers()
        {
            IEnumerable<User> user = await _userService.GetAllUsersAsync();
            IEnumerable<UserDto> response = _mapper.Map<IEnumerable<UserDto>>(user);

            return Ok(response);
        }

        [HttpPost("runmodel")]
        public async Task<ActionResult> RunRecommendationModel(RecommendationInputDto input)
        {
            var user_id = input.user_id;
            var interests = input.interests;

            var recommendationInput = new RecommendationInputDto
            {
                user_id = user_id,
                interests = interests
            };

            _rabbitmqService.SendMessage(recommendationInput);

            return Ok();
        }

        [HttpGet("{userId:Guid}")]
        public async Task<ActionResult<UserDto>> GetUserById(Guid userId)
        {
            User user = await _userService.GetUserByIdAsync(userId);
            UserDto response = _mapper.Map<UserDto>(user);

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser(UserAddViewModel user) ////////////////
        {   
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User userEntity = _mapper.Map<User>(user);
            await _userService.CreateUserAsync(userEntity);

            UserDto response = _mapper.Map<UserDto>(userEntity);

            return CreatedAtAction(nameof(CreateUser), response);
        }

        [HttpPut("{userId:Guid}")]
        public async Task<IActionResult> UpdateUser(Guid userId, UserUpdateViewModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (userId != user.uuid)
            {
                return BadRequest("IDs de usuário não correspondem.");
            }

            User existingUser = await _userService.GetUserByIdAsync(userId);
            if (existingUser == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            User userEntity = _mapper.Map<User>(user);
            await _userService.UpdateUserAsync(userEntity);

            return NoContent();
        }
    }
}
