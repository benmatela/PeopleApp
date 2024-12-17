namespace People.Application.Helpers;

/// <summary>
/// Performs only date related operations
/// </summary>
public static class DateHelpers
{
    /// <summary>
    /// Calculates age using date of birth
    /// </summary>
    public static int GetAge(DateTime dateOfBirth)
    {
        return DateTime.Now.Year - dateOfBirth.Year;
    }
}