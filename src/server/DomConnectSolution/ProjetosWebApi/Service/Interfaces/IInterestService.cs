using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Service.Interfaces
{
    public interface IInterestService
    {
        Task<IEnumerable<Interest>> GetAllInterestsById(Guid userId);
        Task<Interest> GetInterestByIdAsync(int id);
        Task CreateInterest(Interest interest);
        Task DeleteInterestAsync(int id);
    }
}
