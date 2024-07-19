using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Service.Services
{
    public class InterestService : IInterestService
    {
        private readonly IInterestRepository _interestRepository;
        public InterestService(IInterestRepository interestRepository)
        {
            _interestRepository = interestRepository;
        }

        public async Task<IEnumerable<Interest>> GetAllInterestsById(Guid userId)
        {
            return await _interestRepository.GetAllInterestsById(userId);
        }
        public async Task<Interest> GetInterestByIdAsync(int id)
        {
            return await _interestRepository.GetInterestByIdAsync(id);
        }
        public Task CreateInterest(Interest interest)
        {
            return _interestRepository.CreateInterest(interest);
        }

        public Task DeleteInterestAsync(int id)
        {
            return _interestRepository.DeleteInterestAsync(id);
        }
    }
}