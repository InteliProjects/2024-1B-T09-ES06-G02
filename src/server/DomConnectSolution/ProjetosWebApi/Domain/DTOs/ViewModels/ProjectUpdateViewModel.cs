﻿using ProjetosWebApi.Domain.Enumerations;
using System.ComponentModel.DataAnnotations;

namespace ProjetosWebApi.Domain.DTOs.ViewModels
{
    public class ProjectUpdateViewModel
    {
        [Required(ErrorMessage = "Campo 'id' necessário.")]
        public int id { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public DateTime inicial_date { get; set; }
        public DateTime final_date { get; set; }
        public StatusEnum status { get; set; }
        public string? target_audience { get; set; }
        public string? expected_impact { get; set; }
        public string? photo_path { get; set; }
    }
}