use serde::{Deserialize, Serialize};
use crate::api::models::childcare_features::ChildcareFeatures;

#[derive(Serialize, Deserialize, Debug)]
pub struct ChildcareWrapperResponse
{
    pub features: Vec<ChildcareFeatures>
}