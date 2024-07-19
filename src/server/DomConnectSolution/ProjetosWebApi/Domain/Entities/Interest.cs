namespace ProjetosWebApi.Domain.Entities
{
    public class Interest
    {
        public int id { get; set; }
        public Guid user_id { get; set; }
        public int project_id { get; set; }
        public int interest_level { get; set; }

    }
}
