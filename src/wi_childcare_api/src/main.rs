
mod api;
#[macro_use] extern crate rocket;
use rocket::serde::json::Json;
use crate::api::models::childcare_provider::ChildcareProvider;

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/api", routes![get_childcare_providers_by_county])
}
#[get("/childcare-providers-by-county/<county>")]
async fn get_childcare_providers_by_county(county: &str) -> Result<Json<Vec<ChildcareProvider>>, rocket::http::Status>
{
    let childcare_providers = match api::services::wi_childcare_api::get_childcare_providers_by_county(county).await {
        Ok(providers) => providers,
        Err(e) => {
            println!("An error occurred: {}", e);
            return Err(rocket::http::Status::InternalServerError);
        }
    };
    Ok(Json(childcare_providers))
}
