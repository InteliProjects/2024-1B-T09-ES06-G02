using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UsuariosWebApi.Domain.DTOs.Responses;
using UsuariosWebApi.Domain.DTOs.ViewModels;
using UsuariosWebApi.Domain.Entities;
using UsuariosWebApi.Service.Interfaces;
namespace UsuariosWebApi.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSubThemesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserSubThemesService _userSubThemesService;
        public UserSubThemesController(IMapper mapper, IUserSubThemesService userSubThemesService)
        {
            _mapper = mapper;
            _userSubThemesService = userSubThemesService;
        }

        [HttpGet("{userId:Guid}")]
        public async Task<ActionResult<IEnumerable<UserSubThemesDto>>> GetSubThemesByUserId(Guid userId)
        {
            IEnumerable<UserSubThemes> subThemes = await _userSubThemesService.GetSubThemesByUserIdAsync(userId);
            IEnumerable<UserSubThemesDto> response = _mapper.Map<IEnumerable<UserSubThemesDto>>(subThemes);

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUserSubThemes(UserSubThemesAddViewModel subThemes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserSubThemes subThemesEntity = _mapper.Map<UserSubThemes>(subThemes);
            await _userSubThemesService.CreateUserSubThemesAsync(subThemesEntity);

            UserSubThemesDto response = _mapper.Map<UserSubThemesDto>(subThemesEntity);

            return CreatedAtAction(nameof(CreateUserSubThemes), response);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateUserSubThemes(int id, UserSubThemesUpdateViewModel userSubThemes)
        {
            if (id != userSubThemes.id)
            {
                return BadRequest();
            }

            if (id != userSubThemes.id)
            {
                return BadRequest("IDs dos subtemas do usuário não correspondem");
            }

            UserSubThemes existingUserSubThemes = await _userSubThemesService.GetUserSubThemesByIdAsync(id);
            if (existingUserSubThemes == null)
            {
                return NotFound("Subtemas do usuário não existe");
            }

            UserSubThemes userSubThemesEntity = _mapper.Map<UserSubThemes>(userSubThemes);
            await _userSubThemesService.UpdateSubThemesForUserAsync(userSubThemesEntity);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUserSubThemes(int id)
        {
            UserSubThemes existingUserSubThemes = await _userSubThemesService.GetUserSubThemesByIdAsync(id);
            if (existingUserSubThemes == null)
            {
                return NotFound("Subtemas do usuário não existe");
            }

            await _userSubThemesService.DeleteUserSubThemesAsync(id);
            return NoContent();
        }
    }
}