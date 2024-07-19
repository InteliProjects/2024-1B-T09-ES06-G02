using System.ComponentModel.DataAnnotations;

namespace UsuariosWebApi.Domain.DTOs.ViewModels
{
    public class UserUpdateViewModel
    {
        [Required(ErrorMessage = "Id do usuário é obrigatório")]
        public Guid uuid { get; set; }
        public string? name { get; set; }
        public string? job_title { get; set; }
        public string? enterprise { get; set; }
        public string? cpf { get; set; }
        public string? photo_path { get; set; }
    }
}
