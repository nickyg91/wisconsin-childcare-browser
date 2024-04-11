using System.Text.Json;
using WisconsinDhs.Core.Converters;
using WisconsinDhs.Models;

namespace WisconsinDhs.Core.Services.DhsService;

public class WisconsinDhsService : IWisconsinDhsService
{
    private readonly HttpClient _httpClient;

    public WisconsinDhsService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
    public async Task<List<ChildcareProvider>> GetChildcareProviders(string county)
    {
        var url = $"https://dhsgis.wi.gov/server/rest/services/DHS_GIS/Services/MapServer/5/query?where=county like '{county}%'&outFields=*&f=json";
        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode)
        {
            return [];
        }
        var responseContent = await response.Content.ReadAsStringAsync();
        var responseJson = JsonSerializer.Deserialize<DhsDataWrapperResponse<ChildcareProvider>>(responseContent, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters =
            {
                new ChildcareProviderConverter()
            },
        });
            
        return responseJson == null ? [] : responseJson.Features.Select(x => x.Attributes).ToList();
    }
}