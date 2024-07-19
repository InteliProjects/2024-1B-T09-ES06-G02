using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Service.Interfaces
{
    public interface IInteractionService
    {
        Task<IEnumerable<Interaction>> GetAllInteractionsAsync();
        Task<IEnumerable<Interaction>> GetInteractionsByUserIdAsync(Guid userId);
        Task<Interaction> GetInteractionByIdAsync(int id);
        Task CreateInteractionAsync(Interaction interaction);
        Task DeleteInteractionAsync(int id);
    }
}
