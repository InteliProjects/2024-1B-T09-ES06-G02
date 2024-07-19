using ProjetosWebApi.Domain.Enumerations;

namespace ProjetosWebApi.Domain.DTOs.Responses
{
    public class InteractionDto
    {
        public int id { get; set; }
        public Guid user_id { get; set; }
        public int project_id { get; set; }
        public EnumInteraction interaction { get; set; }
    }
}
