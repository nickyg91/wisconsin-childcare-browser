namespace WisconsinDhs.Models;

public class DhsDataWrapperResponse<T>
{
    public List<DhsFeature<T>> Features { get; set; }
}