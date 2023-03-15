namespace Coreplus.Sample.Api.Types;

public record Appointment
{
    public long id { get; set; }
    public DateTime date { get; set; }
    public string client_name { get; set; }
    public string appointment_type { get; set; }
    public int duration { get; set; }
    public double revenue { get; set; }
    public double cost { get; set; }
    public long practitioner_id { get; set; }

}