using UsuariosWebApi.Domain.DTOs.Responses;

namespace UsuariosWebApi.RabbitMQ.Interfaces
{
    public interface IRabbitMQService
    {
        public void SendMessage(RecommendationInputDto input);
    }
}
    