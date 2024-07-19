using Dapper;
using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Context;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;

namespace ProjetosWebApi.Infra.Data.Repository.Repositories
{
    public class InterestRepository : IInterestRepository
    {
        private readonly DatabaseContext _context;

        public InterestRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Interest>> GetAllInterestsById(Guid userId)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = userId
            };

            IEnumerable<Interest>? interestResponse = await db.QueryAsync<Interest>(
                @"SELECT * FROM Interest 
                  WHERE user_id = @UserId",
                parameters
                );

            if (interestResponse == null)
            {
                throw new Exception("Interesses não encontrados.");
            }

            return interestResponse;
        }

        public async Task<Interest> GetInterestByIdAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id
            };

            Interest? interestResponse = await db.QueryFirstOrDefaultAsync<Interest>(
                @"SELECT * FROM Interest 
                  WHERE id = @Id",
                parameters
                );

            if (interestResponse == null)
            {
                throw new Exception("Interesse não encontrado.");
            }

            return interestResponse;
        }

        public async Task CreateInterest(Interest interest)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                UserId = interest.user_id,
                ProjectId = interest.project_id,
                InterestLevel = interest.interest_level,
            };

            await db.ExecuteAsync(
                @"INSERT INTO Interests (user_id, project_id, interest_level)
                  VALUES (@UserId, @ProjectId, @InterestLevel)",
                parameters
                );
        }

        public async Task DeleteInterestAsync(int id)
        {
            using var db = _context.Connect();

            var parameters = new
            {
                Id = id
            };

            await db.ExecuteAsync(
                @"DELETE FROM Interests 
                  WHERE id = @Id",
                parameters
                );
        }
    }
}