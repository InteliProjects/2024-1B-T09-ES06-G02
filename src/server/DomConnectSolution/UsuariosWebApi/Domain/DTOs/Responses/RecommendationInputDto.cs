﻿using ProjetosWebApi.Domain.Entities;

namespace UsuariosWebApi.Domain.DTOs.Responses
{
    public class RecommendationInputDto
    {
        public Guid user_id {  get; set; }
        public List<Interest>? interests {  get; set; }
    }   
}