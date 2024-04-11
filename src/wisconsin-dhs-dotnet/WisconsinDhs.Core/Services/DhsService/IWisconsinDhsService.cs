using WisconsinDhs.Models;

namespace WisconsinDhs.Core.Services.DhsService;

public interface IWisconsinDhsService
{
    Task<List<ChildcareProvider>> GetChildcareProviders(string county);
}