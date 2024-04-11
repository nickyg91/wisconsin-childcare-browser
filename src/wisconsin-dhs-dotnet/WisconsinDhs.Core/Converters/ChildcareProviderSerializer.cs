using System.Text.Json;
using System.Text.Json.Serialization;
using WisconsinDhs.Models;

namespace WisconsinDhs.Core.Converters;

public class ChildcareProviderConverter : JsonConverter<ChildcareProvider>
{
    public override ChildcareProvider Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.StartObject)
        {
            throw new JsonException();
        }

        var provider = new ChildcareProvider();

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
                        case "UNIQUE_ID":
                            provider.Id = reader.GetInt32();
                            break;
                        case "FACILITY_NAME":
                            provider.FacilityName = reader.GetString() ?? string.Empty;
                            break;
                        case "ADDRESS":
                            provider.Address = reader.GetString() ?? string.Empty;
                            break;
                        case "ADDRESS_2":
                            provider.AddressTwo = reader.GetString()?.Trim() ?? string.Empty;
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
                        case "CONTACT_PHONE":
                            provider.ProviderPhone = reader.GetString() ?? string.Empty;
                            break;
                        case "APPLICATION_TYPE":
                            provider.ApplicationType = reader.GetString() ?? string.Empty;
                            break;
                        case "CAPACITY":
                            provider.Capacity = reader.GetInt16();
                            break;
                        case "CONTACT_NAME":
                            provider.ContactName = reader.GetString() ?? string.Empty;
                            break;
                    }

                    break;
                }
            }
        }
        throw new JsonException();
    }

    public override void Write(Utf8JsonWriter writer, ChildcareProvider value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();

        writer.WriteNumber("id", value.Id);
        writer.WriteString("facility_name", value.FacilityName);
        writer.WriteString("address", value.Address);
        writer.WriteString("address_two", value.Address);
        writer.WriteString("city", value.City);
        writer.WriteString("state", value.State);
        writer.WriteString("county", value.County);
        writer.WriteNumber("lat", value.Latitude);
        writer.WriteNumber("long", value.Longitude);
        writer.WriteString("provider_phone", value.ProviderPhone);
        writer.WriteString("application_type", value.ApplicationType);
        writer.WriteNumber("capacity", value.Capacity);
        writer.WriteString("contact_name", value.ContactName);
        writer.WriteEndObject();
    }
}