namespace ProjetosWebApi.Domain.DTOs.Responses
{
    public class InterestDto
    {
        public Guid user_id { get; set; }
        public int project_id { get; set; }
        public int interest_level { get; set; }
    }
}
