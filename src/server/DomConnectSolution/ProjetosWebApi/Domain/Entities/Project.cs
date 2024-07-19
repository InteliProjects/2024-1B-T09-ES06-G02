using ProjetosWebApi.Domain.Enumerations;

namespace ProjetosWebApi.Domain.Entities
{
    public class Project
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public DateTime inicial_date { get; set; }
        public DateTime final_date { get; set; }
        public StatusEnum status { get; set; }
        public string? target_audience { get; set; }
        public string? expected_impact { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public string? photo_path { get; set; }
    }
}