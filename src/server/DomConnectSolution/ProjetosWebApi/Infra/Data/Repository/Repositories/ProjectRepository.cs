using Dapper;
using ProjetosWebApi.Domain.DTOs.Responses;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Context;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;

namespace ProjetosWebApi.Infra.Data.Repository.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DatabaseContext _context;

        public ProjectRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetAllProjectAsync()
        {
            using var db = _context.Connect();
            IEnumerable<Project> project = await db.QueryAsync<Project>(
                @"SELECT * FROM projects"
            );

            if (project == null)
            {
                throw new Exception("Projeto não encontrado.");
            }

            return project;
        }

        public async Task<Project> GetProjectByIdAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id
            };

            Project? project = await db.QueryFirstOrDefaultAsync<Project>(
                @"SELECT * FROM projects 
                  WHERE id = @Id",
                parameters
            );

            if (project == null)
            {
                throw new Exception("Projeto não encontrado");
            }

            return project;
        }

        public async Task<IEnumerable<ProjectsThemeDto>> GetProjectsWithThemeAsync()
        {
            using var db = _context.Connect();

            IEnumerable<ProjectsThemeDto> projects = await db.QueryAsync<ProjectsThemeDto>(
                @"SELECT 
                      Projects.id AS project_id
                    , Projects.name AS project_name
                    , Projects.photo_path  as project_photo_path
                    , Themes.id AS theme_id
                    , Themes.name AS theme_name
                FROM 
                    Projects
                JOIN 
                    Project_sub_themes ON Projects.id = Project_sub_themes.project_id
                JOIN 
                    Sub_Themes ON Project_sub_themes.sub_theme_id = Sub_Themes.id
                JOIN 
                    Themes ON Sub_Themes.theme_id = Themes.id;
                "
            );

            if (projects == null)
            {
                throw new Exception("Projetos não encontrados.");
            }

            return projects;
        }

        public async Task CreateProjectAsync(Project project)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Name = project.name,
                Description = project.description,
                InicialDate = project.inicial_date,
                FinalDate = project.final_date,
                Status = project.status,
                TargetAudience = project.target_audience,
                ExpectedImpact = project.expected_impact,
            };

            await db.ExecuteAsync(
                @"INSERT INTO projects (
                      name
                    , description
                    , inicial_date
                    , final_date
                    , status
                    , target_audience
                    , expected_impact
                ) 
                  VALUES (
                      @Name
                    , @Description
                    , @InicialDate
                    , @FinalDate
                    , @Status
                    , @TargetAudience
                    , @ExpectedImpact
                )",
                parameters
            );
        }

        public async Task UpdateProjectAsync(Project project)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Name = project.name,
                Description = project.description,
                InicialDate = project.inicial_date,
                FinalDate = project.final_date,
                Status = project.status,
                TargetAudience = project.target_audience,
                ExpectedImpact = project.expected_impact,
                UpdatedAt = DateTime.UtcNow,
            };

            await db.ExecuteAsync(
                @"UPDATE projects 
                  SET name = @Name
                    , description = @Description
                    , inicial_date = @InicialDate
                    , final_date = @FinalDate
                    , status = @Status
                    , target_audience = @TargetAudience
                    , expected_impact = @ExpectedImpact
                    , updated_at = @UpdatedAt
                  WHERE id = @Id",
                parameters
            );
        }

        public async Task<IEnumerable<Project>> GetProjectsBySubThemesAsync(IEnumerable<int> subThemeIds)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                SubThemeIds = subThemeIds.ToArray()
            };

            IEnumerable<Project> projects = await db.QueryAsync<Project>(
                @"SELECT p.* 
                  FROM projects p
                  JOIN project_sub_themes pst ON p.id = pst.project_id
                  WHERE pst.sub_theme_id = ANY(@SubThemeIds)",
                parameters
            );

            if (projects == null)
            {
                throw new Exception("Projetos não encontrados.");
            }

            return projects;
        }
    }
}