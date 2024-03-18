use crate::api::models::childcare_provider::ChildcareProvider;
use crate::api::models::childcare_wrapper_response::ChildcareWrapperResponse;

pub async fn get_childcare_providers_by_county(county: &str) -> Result<Vec<ChildcareProvider>, reqwest::Error>
{
    let url = format!("https://dhsgis.wi.gov/server/rest/services/DHS_GIS/Services/MapServer/5/query?where=county like '{}%'&outFields=*&f=json", county);
    let mut childcare_providers: Vec<ChildcareProvider> = Vec::new();
    let result: ChildcareWrapperResponse = reqwest::get(&url).await?.json().await?;
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
    let result: ChildcareWrapperResponse = reqwest::get(&url).await?.json().await?;
    for feature in result.features
    {
        childcare_providers.push(feature.attributes);
    }
    Ok(childcare_providers)
}