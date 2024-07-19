namespace UsuariosWebApi.Domain.Entities
{
    public class UserSubThemes
    {
        public int id { get; set; }

        public Guid user_id { get; set; }

        public int sub_theme_id { get; set; }
    }
}
