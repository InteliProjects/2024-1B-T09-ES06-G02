using System.ComponentModel.DataAnnotations;

namespace UsuariosWebApi.Domain.DTOs.ViewModels
{
    public class UserAddViewModel
    {
        [Required(ErrorMessage = "Nome do usuário é obrigatório")]
        public string? name { get; set; }
        public string? job_title { get; set; }
        public string? enterprise { get; set; }
        [Required(ErrorMessage = "CPF do usuário é obrigatório")]
        public string? cpf { get; set; }
        public string? photo_path { get; set; }
    }
}
