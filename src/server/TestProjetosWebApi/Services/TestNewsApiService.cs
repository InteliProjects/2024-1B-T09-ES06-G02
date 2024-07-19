using Microsoft.AspNetCore.Mvc;
using Moq;
using Moq.Protected;
using NewsApiProject.Controllers;
using Newtonsoft.Json.Linq;
using System.Net;

namespace TestProjetosWebApi.Services
{
    public class NewsControllerTests
    {
        [Fact]
        public async Task GetTopHeadlines_WhenApiSucceeds_ReturnsOkResultWithDynamicContent()
        {
            var httpClientFactoryMock = new Mock<IHttpClientFactory>();
            var mockHttpMessageHandler = new Mock<HttpMessageHandler>();

            var fakeSuccessResponse = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"status\":\"ok\",\"totalResults\":5,\"articles\":[{\"title\":\"Breaking News: Market Rises\",\"url\":\"https://example.com/market-news\",\"published_date\":\"2024-05-24T12:00:00+00:00\",\"publisher\":{\"name\":\"Example News\",\"url\":\"https://example.com\"}}]}"),
            };

            mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(fakeSuccessResponse);

            var client = new HttpClient(mockHttpMessageHandler.Object)
            {
                BaseAddress = new Uri("https://news-api14.p.rapidapi.com/"),
            };

            httpClientFactoryMock.Setup(_ => _.CreateClient(It.IsAny<string>())).Returns(client);

            var controller = new NewsController(httpClientFactoryMock.Object);

            var result = await controller.GetTopHeadlines();

            // Assert the type and basic structure of the response using JObject
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);

            // Parse JSON using JObject
            var responseContent = JObject.Parse(okResult.Value.ToString());

            // Check the status and structure of the JSON response
            Assert.Equal("ok", responseContent["status"].ToString());
            Assert.True(responseContent["totalResults"].ToObject<int>() >= 0);
            Assert.NotNull(responseContent["articles"]);
            Assert.True(responseContent["articles"].HasValues);
        }
    }
}
