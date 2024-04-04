use serde::{Deserialize, Serialize};
use crate::api::models::dhs_features::{DhsFeatures};

#[derive(Serialize, Deserialize, Debug)]
pub struct DhsDataWrapperResponse<T>
{
    pub features: Vec<DhsFeatures<T>>
}