namespace Coreplus.Sample.Api.Dto;

public class PractitionerReportRequestDto
{
    public DateTime? Start { get; set; }
    public DateTime? End { get; set; }
    public long PractitionerId { get; set; }
}
