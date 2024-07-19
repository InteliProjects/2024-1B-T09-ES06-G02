using ProjetosWebApi.Domain.Enumerations;

namespace ProjetosWebApi.Domain.DTOs.ViewModels
{
    public class InteractionAddViewModel
    {
        public Guid user_id { get; set; }
        public int project_id { get; set; }
        public EnumInteraction interaction { get; set; }
    }
}
