use super::application_type::ApplicationType;

pub struct WIChildcareProvider {
    id: i32,
    facility_name: String,
    address: String,
    address_two: String,
    city: String,
    state: String,
    county: String,
    lat: f64,
    long: f64,
    provider_phone: String,
    application_type: ApplicationType,
}
