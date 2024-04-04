use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct DhsFeatures<T>
{
    pub attributes: T
}