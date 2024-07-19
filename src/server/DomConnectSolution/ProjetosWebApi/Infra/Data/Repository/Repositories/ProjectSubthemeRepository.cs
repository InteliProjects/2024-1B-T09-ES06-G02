using Dapper;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Context;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;

namespace ProjetosWebApi.Infra.Data.Repository.Repositories
{
    public class ProjectSubThemeRepository : IProjectSubThemeRepository
    {
        private readonly DatabaseContext _context;

        public ProjectSubThemeRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProjectSubtheme>> GetAllProjectSubThemesAsync()
        {
            using var db = _context.Connect();

            IEnumerable<ProjectSubtheme> projectSubThemes = await db.QueryAsync<ProjectSubtheme>(
                @"SELECT * FROM project_sub_themes"
            );

            if (projectSubThemes == null)
            {
                throw new Exception("Nenhum sub-tema do projeto encontrado.");
            }

            return projectSubThemes;
        }

        public async Task<IEnumerable<ProjectSubtheme>> GetAllProjectSubThemeByUserIdAsync(int projectId)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                ProjectId = projectId,
            };

            IEnumerable<ProjectSubtheme> projectSubThemes = await db.QueryAsync<ProjectSubtheme>(
                @"SELECT * FROM project_sub_themes
                  WHERE project_id = @ProjectId",
                parameters
                );

            if (projectSubThemes == null)
            {
                throw new Exception("Não foi encontrado sub-tema do projeto");
            }

            return projectSubThemes;
        }

        public async Task<ProjectSubtheme> GetProjectSubThemesByIdAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id,
            };

            ProjectSubtheme? projectSubtheme = await db.QueryFirstOrDefaultAsync<ProjectSubtheme>(
                @"SELECT * FROM project_sub_themes
                  WHERE id = @Id",
                parameters
                );

            if (projectSubtheme == null)
            {
                throw new Exception("Subtema do projeto não encontrado.");
            }

            return projectSubtheme;

        }
        public async Task CreateProjectSubThemeAsync(ProjectSubtheme projectSubTheme)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                ProjectId = projectSubTheme.project_id,
                SubThemeId = projectSubTheme.sub_theme_id
            };

            await db.ExecuteAsync(
                @"INSERT INTO project_sub_themes (
                      project_id
                    , sub_theme_id
                )
                  VALUES (
                      @ProjectId
                    , @SubThemeId
                )",
                parameters
            );
        }

        public async Task DeleteProjectSubThemesAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id,
            };

            await db.ExecuteAsync(
                @"DELETE FROM project_sub_themes
                  WHERE id = @Id",
                parameters
            );
        }
    }
}
