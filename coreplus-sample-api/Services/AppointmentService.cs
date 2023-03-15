using System.Globalization;

using Coreplus.Sample.Api.Dto;
using Coreplus.Sample.Api.Types;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Coreplus.Sample.Api.Services;

public class AppointmentService
{
    public async Task<List<PractitionerReportResponseDto>> GetPractitionerReport(PractitionerReportRequestDto request)
    {
        await using var fileStream = File.OpenRead(@"./Data/appointments.json");
        JsonSerializerOptions options = new JsonSerializerOptions();
        options.Converters.Add(new CustomDateTimeConverter("M/d/yyyy"));

        var data = await JsonSerializer.DeserializeAsync<Appointment[]>(fileStream, options);
        if (data == null)
        {
            throw new Exception("Data read error");
        }

        var list = data.Where(x => x.practitioner_id == request.PractitionerId).ToList();

        if (request.Start is not null)
        {
            list = list.Where(x => x.date.Date >= request.Start.Value.Date).ToList();
        }

        if (request.End is not null)
        {
            list = list.Where(x => x.date.Date <= request.End.Value.Date).ToList();
        }

        var result = list.GroupBy(x => new { Year = x.date.Year, Month = x.date.Month })
            .Select(x => new PractitionerReportResponseDto
            {
                id = $"{x.Key.Month}-{x.Key.Year}",
                year = x.Key.Year.ToString(),
                month = DateTimeFormatInfo.CurrentInfo.GetAbbreviatedMonthName(x.Key.Month),
                monthIndex = x.Key.Month,
                cost = x.Sum(g => g.cost),
                revenue = x.Sum(g => g.revenue)
            })
            .OrderByDescending(x => x.year)
            .ThenByDescending(x => x.month)
            .ToList();

        return result;
    }

    public async Task<List<AppointmentDto>> GetPractitionerAppointments(PractitionerAppointmentRequestDto request)
    {
        await using var fileStream = File.OpenRead(@"./Data/appointments.json");
        JsonSerializerOptions options = new JsonSerializerOptions();
        options.Converters.Add(new CustomDateTimeConverter("M/d/yyyy"));

        var data = await JsonSerializer.DeserializeAsync<Appointment[]>(fileStream, options);
        if (data == null)
        {
            throw new Exception("Data read error");
        }

        var list = data
            .Where(x => x.practitioner_id == request.PractitionerId
                        && x.date.Year == request.Year
                        && x.date.Month == request.Month)
            .Select(x => new AppointmentDto()
            {
                id = x.id,
                client_name = x.client_name,
                date = x.date.ToString("MM/dd/yyyy"),
                cost = x.cost,
                revenue = x.revenue,
                practitioner_id = x.practitioner_id,
                appointment_type = x.appointment_type,
                duration = x.duration
            })
            .ToList();

        return list;
    }

}

public class CustomDateTimeConverter : JsonConverter<DateTime>
{
    private readonly string Format;
    public CustomDateTimeConverter(string format)
    {
        Format = format;
    }
    public override void Write(Utf8JsonWriter writer, DateTime date, JsonSerializerOptions options)
    {
        writer.WriteStringValue(date.ToString(Format));
    }
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateTime.ParseExact(reader.GetString(), Format, null);
    }
}