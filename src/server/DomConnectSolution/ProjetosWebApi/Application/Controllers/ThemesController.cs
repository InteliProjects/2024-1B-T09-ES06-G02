using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.DTOs.ViewModels;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThemesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IThemesService _themesService;

        public ThemesController(IMapper mapper, IThemesService themesService)
        {
            _mapper = mapper;
            _themesService = themesService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ThemeDto>>> GetThemes()
        {
            IEnumerable<Theme> themes = await _themesService.GetAllThemesAsync();
            IEnumerable<ThemeDto> response = _mapper.Map<IEnumerable<ThemeDto>>(themes);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ThemeDto>> GetThemeById(int id)
        {
            Theme theme = await _themesService.GetThemeByIdAsync(id);
            ThemeDto response = _mapper.Map<ThemeDto>(theme);

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ThemeDto>> CreateTheme(ThemeAddViewModel theme)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Theme themeEntity = _mapper.Map<Theme>(theme);
            await _themesService.CreateThemeAsync(themeEntity);

            ThemeDto response = _mapper.Map<ThemeDto>(themeEntity);

            return CreatedAtAction(nameof(CreateTheme), response);
        }
    }
}
