using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Infra.Data.Repository.Interfaces
{
    public interface IInterestRepository
    {
        Task<IEnumerable<Interest>> GetAllInterestsById(Guid userId);
        Task<Interest> GetInterestByIdAsync(int id);
        Task CreateInterest(Interest interest);
        Task DeleteInterestAsync(int id);
    }
}
