using Microsoft.AspNetCore.Mvc;
using WisconsinDhs.Core.Services.DhsService;
using WisconsinDhs.Models;

namespace WisconsinDhs.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/childcare/providers")]
    [ApiController]
    public class ChildcareProviderController : ControllerBase
    {
        private readonly IWisconsinDhsService _wisconsinDhsService;

        public ChildcareProviderController(IWisconsinDhsService wisconsinDhsService)
        {
            _wisconsinDhsService = wisconsinDhsService;
        }
        
        [HttpGet("county/{county}", Name = "GetChildcareProvidersByCounty")]
        public async Task<List<ChildcareProvider>> GetChildcareProvidersByCounty(string county)
        {
            return await _wisconsinDhsService.GetChildcareProviders(county);
        }
    }
}
