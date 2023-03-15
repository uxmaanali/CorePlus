using Coreplus.Sample.Api.Endpoints.Practitioner;
using Coreplus.Sample.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// enable cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "PolicyName",
        builder =>
        {
            builder.AllowAnyOrigin();
            builder.AllowAnyHeader();
            builder.AllowAnyMethod();
        });
});

builder.Services.AddSingleton<PractitionerService>();
builder.Services.AddSingleton<AppointmentService>();

var app = builder.Build();

app.UseCors("PolicyName");

var practitionerEndpoints = app.MapGroup("/practitioners");
practitionerEndpoints.MapPractitionerEndpoints();

app.Run();
