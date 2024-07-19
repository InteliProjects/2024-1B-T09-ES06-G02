namespace ProjetosWebApi.Domain.Entities
{
    public class Recommendation
    {
        public int id { get; set; }
        public Guid user_id { get; set; }
        public int project_id { get; set; }
        public float result { get; set; }
    }
}
