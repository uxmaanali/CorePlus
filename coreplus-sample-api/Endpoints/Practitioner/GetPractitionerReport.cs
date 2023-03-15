using Coreplus.Sample.Api.Dto;
using Coreplus.Sample.Api.Services;

using Microsoft.AspNetCore.Mvc;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
    public static class GetPractitionerReport
    {
        public static RouteGroupBuilder MapGetPractitionerReport(this RouteGroupBuilder group)
        {
            group.MapPost("/report", async ([FromBody] PractitionerReportRequestDto request, [FromServices] AppointmentService appointmentService) =>
            {
                var report = await appointmentService.GetPractitionerReport(request);
                return Results.Ok(report);
            });

            group.MapPost("/appointments", async ([FromBody] PractitionerAppointmentRequestDto request, [FromServices] AppointmentService appointmentService) =>
            {
                var report = await appointmentService.GetPractitionerAppointments(request);
                return Results.Ok(report);
            });

            return group;
        }
    }
}
