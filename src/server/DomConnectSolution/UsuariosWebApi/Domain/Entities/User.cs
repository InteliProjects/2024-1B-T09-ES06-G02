namespace UsuariosWebApi.Domain.Entities
{
    public class User
    {
        public Guid uuid { get; set; }
        public string? name { get; set; }
        public string? job_title { get; set; }
        public string? enterprise { get; set; }
        public string? cpf { get; set; }
        public string? photo_path { get; set; }
        public DateTime? created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}
