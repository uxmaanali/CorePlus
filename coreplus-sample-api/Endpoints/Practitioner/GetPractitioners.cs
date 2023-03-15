using Coreplus.Sample.Api.Services;

namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class GetPractitioners
{
    public static RouteGroupBuilder MapGetPractitioners(this RouteGroupBuilder group)
    {
        group.MapGet("/practitioners", async (PractitionerService practitionerService) =>
        {
            var practitioners = await practitionerService.GetRemainingPractitioners();
            return Results.Ok(practitioners);
        });

        return group;
    }
}

