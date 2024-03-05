use serde::Deserialize;
use super::application_type::ApplicationType;

#[derive(Deserialize, Debug)]
pub struct ChildcareProvider {
    #[serde(alias = "UNIQUE_ID")]
    id: i32,
    #[serde(alias = "FACILITY_NAME")]
    facility_name: String,
    #[serde(alias = "ADDRESS")]
    address: String,
    #[serde(alias = "ADDRESS_2")]
    address_two: String,
    #[serde(alias = "CITY")]
    city: String,
    #[serde(alias = "STATE")]
    state: String,
    #[serde(alias = "COUNTY")]
    county: String,
    #[serde(alias = "LAT")]
    lat: f64,
    #[serde(alias = "LON")]
    long: f64,
    #[serde(alias = "CONTACT_PHONE")]
    provider_phone: String,
    #[serde(alias = "APPLICATION_TYPE")]
    application_type: String,
    #[serde(alias = "CAPACITY")]
    capacity: i8,
}

impl ChildcareProvider {
    // pub fn from_json(data: HashMap<String, String>) {
    //     ChildcareProvider {
    //         id: data.get("UNIQUE_ID").unwrap().parse().unwrap(),
    //         facility_name: data.get("FACILITY_NAME").unwrap().to_string(),
    //         address: "".to_string(),
    //         address_two: "".to_string(),
    //         city: "".to_string(),
    //         state: "".to_string(),
    //         county: "".to_string(),
    //         lat: 0.0,
    //         long: 0.0,
    //         provider_phone: "".to_string(),
    //         application_type: ApplicationType::LicensedGroup,
    //     }
    // }
}
