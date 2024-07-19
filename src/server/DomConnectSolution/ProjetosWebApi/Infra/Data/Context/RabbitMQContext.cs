using RabbitMQ.Client;

namespace ProjetosWebApi.Infra.Data.Context
{
    public class RabbitMQService
    {
        private readonly string _hostname = "rabbitmq"; // Use the service name as defined in Docker Compose

        public IConnection GetRabbitMQConnection()
        {
            var factory = new ConnectionFactory() { HostName = _hostname };
            return factory.CreateConnection();
        }
    }
}
