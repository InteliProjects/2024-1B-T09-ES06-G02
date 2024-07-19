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
    public class ProjectSubthemesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IProjectSubThemeService _projectSubThemesService;

        public ProjectSubthemesController(IMapper mapper, IProjectSubThemeService projectSubthemesService)
        {
            _mapper = mapper;
            _projectSubThemesService = projectSubthemesService;
        }

        [HttpGet("{projectId:int}")]
        public async Task<ActionResult<IEnumerable<ProjectSubThemeDto>>> GetAllProjectSubThemeByUserId(int projectId)
        {
            IEnumerable<ProjectSubtheme> projectSubTheme = await _projectSubThemesService.GetAllProjectSubThemeByUserIdAsync(projectId);
            IEnumerable<ProjectSubThemeDto> response = _mapper.Map<IEnumerable<ProjectSubThemeDto>>(projectSubTheme);


            return Ok(response);
        }

        [HttpGet("projects-by-subthemes")]
        public async Task<ActionResult<IEnumerable<ProjectSubThemeDto>>> GetProjectsBySubThemes()
        {
            IEnumerable<ProjectSubtheme> projectSubThemes = await _projectSubThemesService.GetAllProjectSubThemesAsync();
            IEnumerable<ProjectSubThemeDto> response = _mapper.Map<IEnumerable<ProjectSubThemeDto>>(projectSubThemes);

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> CreateProjectSubTheme(ProjectSubthemeAddViewModel projectSubTheme)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProjectSubtheme projectSubThemeEntity = _mapper.Map<ProjectSubtheme>(projectSubTheme);
            await _projectSubThemesService.CreateProjectSubThemeAsync(projectSubThemeEntity);

            ProjectSubThemeDto response = _mapper.Map<ProjectSubThemeDto>(projectSubThemeEntity);

            return CreatedAtAction(nameof(CreateProjectSubTheme), response);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProjectSubTheme(int id)
        {
            ProjectSubtheme existingProjectSubThemes = await _projectSubThemesService.GetProjectSubThemesByIdAsync(id);
            if (existingProjectSubThemes == null)
            {
                return NotFound("Subtemas do projeto não existe");
            }

            await _projectSubThemesService.DeleteProjectSubThemesAsync(id);
            return NoContent();
        }
    }
}