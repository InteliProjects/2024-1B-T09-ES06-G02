using System.ComponentModel.DataAnnotations;

namespace ProjetosWebApi.Domain.DTOs.ViewModels
{
    public class ProjectSubthemeAddViewModel
    {
        [Required(ErrorMessage = "O campo 'project_id' é obrigatorio.")]
        public int project_id { get; set; }

        [Required(ErrorMessage = "O campo 'sub_theme_id' é obrigatorio.")]
        public int sub_theme_id { get; set; }
    }
}
