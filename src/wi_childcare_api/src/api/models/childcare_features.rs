use serde::{Deserialize, Serialize};
use crate::api::models::childcare_provider::ChildcareProvider;

#[derive(Serialize, Deserialize, Debug)]
pub struct ChildcareFeatures
{
    pub attributes: ChildcareProvider
}