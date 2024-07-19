namespace ProjetosWebApi.Domain.Entities
{
    public class SubTheme
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int theme_id { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}
