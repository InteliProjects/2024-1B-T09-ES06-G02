using ProjetosWebApi.Domain.Entities;
using ProjetosWebApi.Infra.Data.Repository.Interfaces;
using ProjetosWebApi.Service.Interfaces;

namespace ProjetosWebApi.Service.Services
{
    public class InteractionService : IInteractionService
    {
        private readonly IInteractionRepository _interactionRepository;

        public InteractionService(IInteractionRepository interactionRepository)
        {
            _interactionRepository = interactionRepository;
        }

        public Task<IEnumerable<Interaction>> GetAllInteractionsAsync()
        {
            return _interactionRepository.GetAllInteractionsAsync();
        }

        public Task<IEnumerable<Interaction>> GetInteractionsByUserIdAsync(Guid userId)
        {
            return _interactionRepository.GetInteractionsByUserIdAsync(userId);
        }

        public Task<Interaction> GetInteractionByIdAsync(int id)
        {
            return _interactionRepository.GetInteractionByIdAsync(id);
        }

        public Task CreateInteractionAsync(Interaction interaction)
        {
            return _interactionRepository.CreateInteractionAsync(interaction);
        }

        public Task DeleteInteractionAsync(int id)
        {
            return _interactionRepository.DeleteInteractionAsync(id);
        }
    }
}
