using Dapper;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Context;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;

namespace ProjetosWebApi.Infra.Data.Repository.Repositories
{
    public class InteractionRepository : IInteractionRepository
    {
        private readonly DatabaseContext _context;

        public InteractionRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Interaction>> GetAllInteractionsAsync()
        {
            using var db = _context.Connect();

            IEnumerable<Interaction> interactions = await db.QueryAsync<Interaction>(
                @"SELECT * FROM interaction"
            );

            return interactions;
        }
        public async Task<IEnumerable<Interaction>> GetInteractionsByUserIdAsync(Guid userId)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = userId
            };

            IEnumerable<Interaction> interactions = await db.QueryAsync<Interaction>(
                @"SELECT * FROM interaction 
                  WHERE user_id = @UserId",
                parameters
            );

            if (interactions == null)
            {
                throw new Exception("Interação não encontrada");
            }

            return interactions;
        }

        public async Task<Interaction> GetInteractionByIdAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id
            };

            Interaction? interaction = await db.QueryFirstOrDefaultAsync<Interaction>(
                @"SELECT * FROM interaction 
                  WHERE id = @Id",
                parameters
            );

            if (interaction == null)
            {
                throw new Exception("Interação não encontrada");
            }

            return interaction;
        }

        public async Task CreateInteractionAsync(Interaction interaction)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = interaction.user_id,
                ProjectId = interaction.project_id,
                InteractionType = interaction.interaction
            };

            await db.ExecuteAsync(
                @"INSERT INTO interaction (user_id, project_id, interaction)
                  VALUES (@UserId, @ProjectId, @InteractionType)",
                parameters
            );
        }

        public async Task DeleteInteractionAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id
            };

            await db.ExecuteAsync(
                @"DELETE FROM interaction 
                  WHERE id = @Id",
                parameters
            );
        }
    }
}
