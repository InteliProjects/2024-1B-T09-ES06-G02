namespace ProjetosWebApi.Domain.DTOs.Responses
{
    public class RecommendationDTO
    {
        public Guid user_id { get; set; }
        public int project_id { get; set; }
        public float result { get; set; }
    }
}
