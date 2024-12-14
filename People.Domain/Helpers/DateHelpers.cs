using System.Globalization;

namespace People.Domain.Helpers;

public static class DateHelpers
{
    /// <summary>
    /// Calculates age using date of birth
    /// </summary>
    public static int GetAge(DateTime dateOfBirth)
    {
        return DateTime.Now.Year - dateOfBirth.Year;
    }

    /// <summary>
    /// Creates new date from a string
    /// </summary>
    public static DateTime CreateDate(string date)
    {
        CultureInfo provider = CultureInfo.InvariantCulture;
        DateTime dateTime = DateTime.ParseExact(date, "dd-MM-yyyy HH:mm:ss,fff", provider);

        return dateTime;
    }
}