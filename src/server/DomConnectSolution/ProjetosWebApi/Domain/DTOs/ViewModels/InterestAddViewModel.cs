using System.ComponentModel.DataAnnotations;

namespace ProjetosWebApi.Domain.DTOs.ViewModels
{
    public class InterestAddViewModel
    {
        [Required(ErrorMessage = "O campo 'user_id' é obrigatorio.")]
        public Guid user_id { get; set; }

        [Required(ErrorMessage = "O campo 'project_id' é obrigatorio.")]
        public int project_id { get; set; }

        [Required(ErrorMessage = "O campo 'interest_level' é obrigatorio.")]
        public int interest_level { get; set; }
    }
}
