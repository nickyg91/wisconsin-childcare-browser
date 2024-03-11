use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ChildcareProvider {
    #[serde(rename(deserialize = "UNIQUE_ID"))]
    id: i32,
    #[serde(rename(deserialize = "FACILITY_NAME"))]
    facility_name: String,
    #[serde(rename(deserialize = "ADDRESS"))]
    address: String,
    #[serde(rename(deserialize = "ADDRESS_2"))]
    address_two: String,
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
    #[serde(rename(deserialize = "CONTACT_PHONE"))]
    provider_phone: String,
    #[serde(rename(deserialize = "APPLICATION_TYPE"))]
    application_type: String,
    #[serde(rename(deserialize = "CAPACITY"))]
    capacity: i16,
}