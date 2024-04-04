use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct VaccinationProvider {
    #[serde(rename(deserialize = "OBJECTID"))]
    id: i32,
    #[serde(rename(deserialize = "FACILITY_NAME"))]
    facility_name: String,
    #[serde(rename(deserialize = "ADDRESS"))]
    address: String,
    #[serde(rename(deserialize = "CITY"))]
    city: String,
    #[serde(rename(deserialize = "STATE"))]
    state: String,
    #[serde(rename(deserialize = "COUNTY"))]
    county: String,
    #[serde(rename(deserialize = "LAT"))]
    lat: f64,
    #[serde(rename(deserialize = "LON"))]
    long: f64,
    #[serde(rename(deserialize = "PHONE"))]
    provider_phone: String
}