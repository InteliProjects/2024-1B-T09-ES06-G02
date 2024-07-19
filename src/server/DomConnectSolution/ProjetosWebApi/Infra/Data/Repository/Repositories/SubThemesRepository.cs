using Dapper;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Context;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;

namespace ProjetosWebApi.Infra.Data.Repository.Repositories
{
    public class SubThemesRepository : ISubThemesRepository
    {
        private readonly DatabaseContext _context;

        public SubThemesRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SubTheme>> GetAllSubThemesAsync()
        {
            using var db = _context.Connect();
            IEnumerable<SubTheme> subThemes = await db.QueryAsync<SubTheme>(
                @"SELECT * FROM sub_themes"
            );

            if (subThemes == null)
            {
                throw new Exception("Sub-tema não encontrado");
            };

            return subThemes;
        }

        public async Task<SubTheme> GetSubThemeByIdAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id
            };

            SubTheme? subTheme = await db.QueryFirstOrDefaultAsync<SubTheme>(
                @"SELECT * FROM sub_themes 
                  WHERE id = @Id",
                parameters
            );

            if (subTheme == null)
            {
                throw new Exception("Sub-tema não encontrado.");
            };

            return subTheme;
        }

        public async Task CreateSubThemeAsync(SubTheme subTheme)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Name = subTheme.name,
                Description = subTheme.description,
                ThemeId = subTheme.theme_id
            };

            await db.QueryFirstOrDefaultAsync<SubTheme>(
                @"INSERT INTO sub_themes (
                      name
                    , description
                    , theme_id
                )
                VALUES (
                      @Name
                    , @Description
                    , @ThemeId
                )",
                parameters
            );
        }
    }
}
