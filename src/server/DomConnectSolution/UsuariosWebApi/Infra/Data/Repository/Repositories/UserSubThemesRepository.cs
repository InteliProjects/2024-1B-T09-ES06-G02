using AutoMapper;
using Dapper;
using UsuariosWebApi.Domain.Entities;
using UsuariosWebApi.Infra.Data.Context;
using UsuariosWebApi.Infra.Data.Repository.Interfaces;
namespace UsuariosWebApi.Infra.Data.Repository.Repositories
{
    public class UserSubThemesRepository : IUserSubThemesRepository
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public UserSubThemesRepository(DatabaseContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<UserSubThemes> GetUserSubThemesByIdAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id,
            };

            UserSubThemes? userSubThemes = await db.QueryFirstOrDefaultAsync<UserSubThemes>(
                @"SELECT * FROM user_sub_themes
                  WHERE id = @Id",
                parameters
                );

            if (userSubThemes == null)
            {
                throw new Exception("Subtemas do usuário não existe");
            }

            return userSubThemes;
        }

        public async Task<IEnumerable<UserSubThemes>> GetSubThemesByUserIDAsync(Guid userId)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = userId
            };

            IEnumerable<UserSubThemes> usersubthemesResponse = await db.QueryAsync<UserSubThemes>(
                @"SELECT *
                FROM sub_Themes
                INNER JOIN User_sub_themes ON Sub_themes.id = User_sub_themes.sub_theme_id
                INNER JOIN Users ON User_sub_themes.user_id = Users.uuid
                WHERE Users.uuid = @UserId;", parameters
                );

            if (usersubthemesResponse == null)
            {
                throw new Exception("Subtemas não encontrado.");
            }

            return usersubthemesResponse;
        }

        public async Task CreateUserSubThemesAsync(UserSubThemes userSubThemes)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = userSubThemes.user_id,
                SubThemeId = userSubThemes.sub_theme_id
            };

            await db.ExecuteAsync(
                @"INSERT INTO user_sub_themes (user_id, sub_theme_id)
                VALUES (@userId, @SubThemeId);",
                parameters
            );
        }

        public async Task UpdateSubThemesForUserAsync(UserSubThemes subThemes)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = subThemes.user_id,
                SubThemeId = subThemes.sub_theme_id,
                UpdatedAt = DateTime.UtcNow
            };

            await db.ExecuteAsync(
                @"UPDATE user_sub_themes
                SET sub_theme_id = @SubThemeId
                WHERE user_id = @UserId;",
                parameters
            );
        }

        public async Task DeleteUserSubThemesAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id
            };

            await db.ExecuteAsync(
                @"DELETE FROM user_sub_themes
                  WHERE id = @Id",
                parameters
            );
        }
    }
}
