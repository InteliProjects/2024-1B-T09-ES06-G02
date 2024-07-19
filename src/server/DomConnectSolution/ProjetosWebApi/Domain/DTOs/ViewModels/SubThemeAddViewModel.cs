using System.ComponentModel.DataAnnotations;

namespace ProjetosWebApi.Domain.DTOs.ViewModels
{
    public class SubThemeAddViewModel
    {
        public string name { get; set; }
        public string description { get; set; }
        [Required(ErrorMessage = "O campo 'theme_id' é obrigatorio")]
        public int theme_id { get; set; }
    }
}
