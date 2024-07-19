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
    public class ProjectController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMapper _mapper;
        private readonly IProjectService _projectService;

        public ProjectController(IMapper mapper, IProjectService projetosService, IHttpClientFactory httpClientFactory)
        {
            _mapper = mapper;
            _projectService = projetosService;
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProject()
        {
            IEnumerable<Project> project = await _projectService.GetAllProjectAsync();
            IEnumerable<ProjectDto> response = _mapper.Map<IEnumerable<ProjectDto>>(project);

            return Ok(response);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProjectDto>> GetProjectById(int id)
        {
            Project project = await _projectService.GetProjectByIdAsync(id);
            ProjectDto response = _mapper.Map<ProjectDto>(project);

            return Ok(response);
        }

        [HttpGet("user/{userId:Guid}/projects-by-subthemes")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsByUserSubThemes(Guid userId)
        {
            // Cria um HttpClient nomeado
            var httpClient = _httpClientFactory.CreateClient("usuarios-service");

            // Obter subtemas de interesse do usuário do serviço de Usuários
            var userSubThemesResponse = await httpClient.GetAsync($"/api/UserSubThemes/{userId}");
            if (!userSubThemesResponse.IsSuccessStatusCode)
            {
                return NotFound("Subtemas de interesse do usuário não encontrados.");
            }

            var userSubThemes = await userSubThemesResponse.Content.ReadFromJsonAsync<IEnumerable<UserSubThemesDto>>();
            if (userSubThemes == null)
            {
                return NotFound("Subtemas de interesse do usuário não encontrados.");
            }

            var subThemeIds = userSubThemes.Select(st => st.sub_theme_id).ToList();

            // Obter projetos baseados nos subtemas
            IEnumerable<Project> projects = await _projectService.GetProjectsBySubThemesAsync(subThemeIds);
            IEnumerable<ProjectDto> response = _mapper.Map<IEnumerable<ProjectDto>>(projects);

            return Ok(response);
        }

        [HttpGet("projects-with-theme")]
        public async Task<ActionResult<IEnumerable<ProjectsThemeDto>>> GetProjectsWithTheme()
        {
            IEnumerable<ProjectsThemeDto> response = await _projectService.GetProjectsWithThemeAsync();

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject(ProjectAddViewModel project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Project projectEntity = _mapper.Map<Project>(project);
            await _projectService.CreateProjectAsync(projectEntity);

            ProjectDto response = _mapper.Map<ProjectDto>(projectEntity);

            

            return CreatedAtAction(nameof(CreateProject), response);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProject(int id, ProjectUpdateViewModel project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != project.id)
            {
                return BadRequest("IDs de Projetos não correspondem.");
            }

            Project existingProject = await _projectService.GetProjectByIdAsync(project.id);
            if (existingProject == null)
            {
                return NotFound("Projeto não encontrado.");
            }

            Project projectEntity = _mapper.Map<Project>(project);

            await _projectService.UpdateProjectAsync(projectEntity);
            return NoContent();
        }
    }
}
