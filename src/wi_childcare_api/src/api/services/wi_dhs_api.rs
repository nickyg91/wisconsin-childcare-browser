use crate::api::models::childcare_provider::{ChildcareProvider};
use crate::api::models::dhs_data_wrapper_response::DhsDataWrapperResponse;
use crate::api::models::vaccination_provider::VaccinationProvider;

pub async fn get_childcare_providers_by_county(county: &str) -> Result<Vec<ChildcareProvider>, reqwest::Error>
{
    let url = format!("https://dhsgis.wi.gov/server/rest/services/DHS_GIS/Services/MapServer/5/query?where=county like '{}%'&outFields=*&f=json", county);
    let mut childcare_providers: Vec<ChildcareProvider> = Vec::new();
    let result: DhsDataWrapperResponse<ChildcareProvider> = reqwest::get(&url).await?.json().await?;
    for feature in result.features
    {
        childcare_providers.push(feature.attributes);
    }
    Ok(childcare_providers)
}

pub async fn get_childcare_providers_like_facility_name(name: &str) -> Result<Vec<ChildcareProvider>, reqwest::Error>
{
    let url = format!("https://dhsgis.wi.gov/server/rest/services/DHS_GIS/Services/MapServer/5/query?where=facility_name like '%{}%'&outFields=*&f=json", name);
    let mut childcare_providers: Vec<ChildcareProvider> = Vec::new();
    let result: DhsDataWrapperResponse<ChildcareProvider> = reqwest::get(&url).await?.json().await?;
    for feature in result.features
    {
        childcare_providers.push(feature.attributes);
    }
    Ok(childcare_providers)
}

pub async fn get_child_vaccination_program_participant_locations_by_county(county: &str) -> Result<Vec<VaccinationProvider>, reqwest::Error> {
    let url = format!("https://dhsgis.wi.gov/server/rest/services/DHS_GIS/Services/MapServer/0/query?where=county like '%{}%'&outFields=*&f=json", county);
    let mut vaccine_providers: Vec<VaccinationProvider> = Vec::new();
    let result: DhsDataWrapperResponse<VaccinationProvider> = reqwest::get(&url).await?.json().await?;
    for feature in result.features
    {
        vaccine_providers.push(feature.attributes);
    }
    Ok(vaccine_providers)
}