using ProjetosWebApi.Domain.Enumerations;

namespace ProjetosWebApi.Domain.Entities
{
    public class Interaction
    {
        public int id { get; set; }
        public Guid user_id { get; set; }

        public int project_id { get; set; }

        public EnumInteraction interaction { get; set; }

    }
}
