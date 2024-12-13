namespace People.Infrastructure.Helpers;

public static class DateHelpers
{
    /// <summary>
    /// Calculates age using a date of birth
    /// </summary>
    public static int GetAge(DateTime dateOfBirth)
    {
        return DateTime.Now.Year - dateOfBirth.Year;
    }
}