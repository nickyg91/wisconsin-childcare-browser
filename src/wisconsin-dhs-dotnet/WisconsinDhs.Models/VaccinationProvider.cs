namespace WisconsinDhs.Models;

public class VaccinationProvider
{
    public int Id { get; set; }
    public string FacilityName { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string County { get; set; }
    public float Latitude { get; set; }
    public float Longitude { get; set; }
    public string ProviderPhone { get; set; }
}