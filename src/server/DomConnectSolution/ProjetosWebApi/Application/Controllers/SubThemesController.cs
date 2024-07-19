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
    public class SubThemesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ISubThemesService _subThemesService;

        public SubThemesController(IMapper mapper, ISubThemesService subThemesService)
        {
            _mapper = mapper;
            _subThemesService = subThemesService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubThemeDto>>> GetAllSubThemes()
        {
            IEnumerable<SubTheme> subThemes = await _subThemesService.GetAllSubThemesAsync();
            IEnumerable<SubThemeDto> response = _mapper.Map<IEnumerable<SubThemeDto>>(subThemes);

            return Ok(response);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<SubThemeDto>> GetSubThemeById(int id)
        {
            SubTheme subTheme = await _subThemesService.GetSubThemeByIdAsync(id);
            SubThemeDto response = _mapper.Map<SubThemeDto>(subTheme);

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<SubThemeDto>> CreateSubTheme(SubThemeAddViewModel subTheme)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SubTheme subThemeEntity = _mapper.Map<SubTheme>(subTheme);
            await _subThemesService.CreateSubThemeAsync(subThemeEntity);

            SubThemeDto response = _mapper.Map<SubThemeDto>(subThemeEntity);

            return CreatedAtAction(nameof(CreateSubTheme), response);
        }
    }
}
