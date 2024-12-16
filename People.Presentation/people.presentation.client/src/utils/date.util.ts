/**
 * Converts date to YYYY-MM-DD format
 *
 * @returns {string} dateInput
 *
 * @returns {string} formatedDate
 *
 * @throws {Error} error
 */
export const convertDateToYYYMMDD = (dateInput: string) => {
  try {
    const newDate = new Date(dateInput);
    const formatDate =
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    const formatMonth =
      newDate.getMonth() < 10 ? `0${newDate.getMonth()}` : newDate.getMonth();
    const formattedDate = [newDate.getFullYear(), formatMonth, formatDate].join(
      "-"
    );

    return formattedDate;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Gets age from date of birth
 *
 * @param {Date} dateInput
 *
 * @returns {int} age
 *
 * @throws {Error} error
 */
export const getAge = (dateInput: Date) => {
  try {
    return new Date().getFullYear() - dateInput.getFullYear();
  } catch (error: any) {
    throw new Error(error.mesage);
  }
};
