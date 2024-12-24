using Microsoft.AspNetCore.Mvc;
using WisconsinDhs.Core.Services.DhsService;
using WisconsinDhs.Models;

namespace WisconsinDhs.Web.Controllers
{
    [Route("api/vaccines")]
    [ApiController]
    public class VaccinationController : ControllerBase
    {
        private readonly IWisconsinDhsService _wisconsinDhsService;

        public VaccinationController(IWisconsinDhsService wisconsinDhsService)
        {
            _wisconsinDhsService = wisconsinDhsService;
        }
        
        [HttpGet("providers/county/{county}", Name = "GetVaccinationProvidersByCounty")]
        public async Task<List<VaccinationProvider>> GetVaccinationProvidersByCounty(string county)
        {
            return await _wisconsinDhsService.GetVaccinationProviders(county);
        }
    }
}
