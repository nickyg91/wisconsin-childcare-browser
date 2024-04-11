using WisconsinDhs.Core.Converters;
using WisconsinDhs.Core.Services.DhsService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var httpClient = new HttpClient();
builder.Services.AddSingleton(httpClient);
builder.Services.AddScoped<IWisconsinDhsService, WisconsinDhsService>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new ChildcareProviderConverter());
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();