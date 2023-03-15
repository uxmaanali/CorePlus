namespace Coreplus.Sample.Api.Dto;

public record PractitionerReportResponseDto
{
    public string id { get; set; }
    public string year { get; set; }
    public int monthIndex { get; set; }
    public string month { get; set; }
    public double cost { get; set; }
    public double revenue { get; set; }
};