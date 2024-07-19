﻿using System.ComponentModel.DataAnnotations;

namespace UsuariosWebApi.Domain.DTOs.ViewModels
{
    public class UserSubThemesUpdateViewModel
    {
        [Required(ErrorMessage = "O campo 'id' é obrigatória")]
        public int id { get; set; }
        [Required(ErrorMessage = "O campo 'user_id' é obrigatório.")]
        public Guid user_id { get; set; }
        [Required(ErrorMessage = "O campo 'sub_theme_id' é obrigatório")]
        public int sub_theme_id { get; set; }
    }
}