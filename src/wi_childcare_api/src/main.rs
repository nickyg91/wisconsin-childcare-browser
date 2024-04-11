
mod api;
#[macro_use] extern crate rocket;

use std::path::{Path, PathBuf};
use rocket::fs::{NamedFile, relative};
use rocket::serde::json::Json;
use crate::api::models::childcare_provider::{ChildcareProvider};
use crate::api::models::vaccination_provider::VaccinationProvider;

const DIST: &str = "dist";

#[get("/<file..>", rank = 0)]
async fn static_files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new(DIST).join("assets/").join(file))
        .await
        .ok()
}

#[get("/<_..>", rank = 1)]
async fn index() -> Option<NamedFile> {
    NamedFile::open(Path::new(DIST).join("index.html"))
        .await
        .ok()
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/api", routes![get_childcare_providers_by_county, get_childcare_providers_like_facility_name, get_child_vaccination_participants_by_county])
        .mount("/assets", routes![static_files])
        .mount("/", routes![index])
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
