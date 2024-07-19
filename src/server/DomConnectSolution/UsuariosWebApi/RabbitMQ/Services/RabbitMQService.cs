using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using UsuariosWebApi.Domain.DTOs.Responses;
using UsuariosWebApi.Domain.Entities;
using UsuariosWebApi.RabbitMQ.Interfaces;

namespace UsuariosWebApi.RabbitMQ.Services
{
    public class RabbitMQService : IRabbitMQService
    {
        public void SendMessage(RecommendationInputDto input)
        {
            var factory = new ConnectionFactory() { HostName = "rabbitmq" }; // Adjust the hostname if necessary
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "RecommendationQueue",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                arguments: null);

                string messageJson = JsonSerializer.Serialize(input);

                var body = Encoding.UTF8.GetBytes(messageJson);

                channel.BasicPublish(exchange: "",
                                     routingKey: "RecommendationQueue",
                                     basicProperties: null,
                                     body: body);
                Console.WriteLine("Sent: {0}", messageJson);
            }
        }

    }
}
