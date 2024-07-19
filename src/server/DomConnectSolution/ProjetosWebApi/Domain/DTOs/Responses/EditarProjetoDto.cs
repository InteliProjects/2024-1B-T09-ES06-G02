namespace ProjetosWebApi.Domain.DTOs.Requests
{
    public class EditProjectDto
    {
        public string? name { get; set; }
        public string? description { get; set; }
        public DateTime inicial_date { get; set; }
        public DateTime final_date { get; set; }
        public int status { get; set; }
        public string? target_audience { get; set; }
        public string? expected_impact { get; set; }
    }
}
