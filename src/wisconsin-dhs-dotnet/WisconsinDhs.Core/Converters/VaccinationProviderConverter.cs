using System.Text.Json;
using System.Text.Json.Serialization;
using WisconsinDhs.Models;

namespace WisconsinDhs.Core.Converters;

public class VaccinationProviderConverter : JsonConverter<VaccinationProvider>
{
    public override VaccinationProvider? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var provider = new VaccinationProvider();
        while (reader.Read())
        {
            switch (reader.TokenType)
            {
                case JsonTokenType.EndObject:
                    return provider;
                case JsonTokenType.PropertyName:
                {
                    var propertyName = reader.GetString();
                    reader.Read();

                    switch (propertyName)
                    {
                        case "OBJECTID":
                            provider.Id = reader.GetInt32();
                            break;
                        case "FACILITY_NAME":
                            provider.FacilityName = reader.GetString() ?? string.Empty;
                            break;
                        case "ADDRESS":
                            provider.Address = reader.GetString() ?? string.Empty;
                            break;
                        case "CITY":
                            provider.City = reader.GetString() ?? string.Empty;
                            break;
                        case "STATE":
                            provider.State = reader.GetString() ?? string.Empty;
                            break;
                        case "COUNTY":
                            provider.County = reader.GetString() ?? string.Empty;
                            break;
                        case "LAT":
                            provider.Latitude = reader.GetSingle();
                            break;
                        case "LON":
                            provider.Longitude = reader.GetSingle();
                            break;
                        case "PHONE":
                            provider.ProviderPhone = reader.GetString() ?? string.Empty;
                            break;
                    }
                    break;
                }
            }
        }
        throw new JsonException();
    }

    public override void Write(Utf8JsonWriter writer, VaccinationProvider value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WriteNumber("id", value.Id);
        writer.WriteString("facility_name", value.FacilityName);
        writer.WriteString("address", value.Address);
        writer.WriteString("city", value.City);
        writer.WriteString("state", value.State);
        writer.WriteString("county", value.County);
        writer.WriteNumber("lat", value.Latitude);
        writer.WriteNumber("long", value.Longitude);
        writer.WriteString("provider_phone", value.ProviderPhone);
        writer.WriteEndObject();
    }
}