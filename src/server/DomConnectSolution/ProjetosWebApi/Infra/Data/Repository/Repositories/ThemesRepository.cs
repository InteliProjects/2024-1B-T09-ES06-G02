using Dapper;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Context;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;


namespace ProjetosWebApi.Infra.Data.Repository.Repositories
{
    public class ThemesRepository : IThemesRepository
    {
        private readonly DatabaseContext _context;

        public ThemesRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Theme>> GetAllThemesAsync()
        {
            using var db = _context.Connect();
            IEnumerable<Theme> themes = await db.QueryAsync<Theme>(
                @"SELECT * FROM themes"
            );

            if (themes == null)
            {
                throw new Exception("Temas não encontrados.");
            }

            return themes;
        }

        public async Task<Theme> GetThemeByIdAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id
            };

            Theme? theme = await db.QueryFirstOrDefaultAsync<Theme>(
                @"SELECT * FROM themes 
                  WHERE id = @Id",
                parameters
            );

            if (theme == null)
            {
                throw new Exception("Temas não encontrados.");
            };

            return theme;
        }

        public async Task CreateThemeAsync(Theme theme)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Name = theme.name,
                Description = theme.description,

            };

            await db.ExecuteAsync(
                @"INSERT INTO themes (
                      name
                    , description
                    ) 
                    VALUES (
                      @Name
                    , @Description",
                parameters
            );
        }

    }
}
