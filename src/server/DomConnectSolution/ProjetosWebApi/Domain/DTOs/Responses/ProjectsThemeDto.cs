using ProjetosWebApi.Domain.Entities;

namespace ProjetosWebApi.Domain.DTOs.Responses
{
    public class ProjectsThemeDto
    {
        public int project_id { get; set; }
        public string? project_name { get; set; }
        public string? project_photo_path { get; set; }
        public int theme_id { get; set; }
        public string? theme_name { get; set; }
    }
}
