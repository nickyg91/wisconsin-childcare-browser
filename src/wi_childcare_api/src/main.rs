
mod api;
#[macro_use] extern crate rocket;
use rocket::serde::json::Json;
use crate::api::models::childcare_provider::{ChildcareProvider};
use crate::api::models::vaccination_provider::VaccinationProvider;

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/api", routes![get_childcare_providers_by_county, get_childcare_providers_like_facility_name, get_child_vaccination_participants_by_county])
}
#[get("/childcare/providers/county/<county>")]
async fn get_childcare_providers_by_county(county: &str) -> Result<Json<Vec<ChildcareProvider>>, rocket::http::Status>
{
    let childcare_providers = match api::services::wi_dhs_api::get_childcare_providers_by_county(county).await {
        Ok(providers) => providers,
        Err(e) => {
            println!("An error occurred: {}", e);
            return Err(rocket::http::Status::InternalServerError);
        }
    };
    Ok(Json(childcare_providers))
}

#[get("/childcare/providers/facility-name/<name>")]
async fn get_childcare_providers_like_facility_name(name: &str) -> Result<Json<Vec<ChildcareProvider>>, rocket::http::Status>
{
    let childcare_providers = match api::services::wi_dhs_api::get_childcare_providers_like_facility_name(name).await {
        Ok(providers) => providers,
        Err(e) => {
            println!("An error occurred: {}", e);
            return Err(rocket::http::Status::InternalServerError);
        }
    };
    Ok(Json(childcare_providers))
}

#[get("/childcare/vaccines/county/<county>")]
async fn get_child_vaccination_participants_by_county(county: &str) -> Result<Json<Vec<VaccinationProvider>>, rocket::http::Status>
{
    let childcare_providers = match api::services::wi_dhs_api::get_child_vaccination_program_participant_locations_by_county(county).await {
        Ok(providers) => providers,
        Err(e) => {
            println!("An error occurred: {}", e);
            return Err(rocket::http::Status::InternalServerError);
        }
    };
    Ok(Json(childcare_providers))
}
