using System.ComponentModel.DataAnnotations;

namespace ProjetosWebApi.Domain.DTOs.ViewModels
{
    public class ThemeAddViewModel
    {
        [Required(ErrorMessage = "O campo 'name' é obrigatorio.")]
        public string? name { get; set; }
        public string? description { get; set; }
    }
}
