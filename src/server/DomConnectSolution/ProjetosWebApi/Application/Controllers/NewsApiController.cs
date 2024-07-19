using Microsoft.AspNetCore.Mvc;

namespace NewsApiProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public NewsController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("top-headlines")]
        public async Task<IActionResult> GetTopHeadlines([FromQuery] int elements = 10, string category = "business")
        {
            var client = _httpClientFactory.CreateClient();
            var requestUrl = $"https://news-api14.p.rapidapi.com/top-headlines?country=BR&language=en&pageSize={elements}&category={category}";

            var requestMessage = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(requestUrl),
                Headers =
                {
                    { "X-RapidAPI-Key", "68e10559b1msh3cddb7cda5f6608p1ddb59jsn29f4206facad" },
                    { "X-RapidAPI-Host", "news-api14.p.rapidapi.com" },
                },
            };

            using (var response = await client.SendAsync(requestMessage))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                return Ok(body);
            }
        }
    }
}
