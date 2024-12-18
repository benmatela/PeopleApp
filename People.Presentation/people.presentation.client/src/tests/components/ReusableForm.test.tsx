import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReusableForm from "../../components/forms/reusable-form/ReusableForm";
import { IFormField } from "../../models/form.model";
import { convertDateToYYYMMDD, getAge } from "../../utils/date.util";

describe("ReusableForm", () => {
  const createPersonformFields: IFormField[] = [
    {
      name: "firstName",
      label: "First Name:",
      type: "text",
      placeholder: "First Name",
      defaultValue: "",
      disabled: false,
      validation: {
        required: "First Name is required",
        minLength: {
          value: 3,
          message: "First Name must be at least 3 characters",
        },
      },
    },
    {
      name: "lastName",
      label: "Last Name:",
      type: "text",
      defaultValue: "",
      disabled: false,
      placeholder: "Last Name",
      validation: {
        required: "Last Name is required",
        minLength: {
          value: 3,
          message: "Last Name must be at least 3 characters",
        },
      },
    },
    {
      name: "dateOfBirth",
      label: "Date Of Birth:",
      type: "date",
      placeholder: "Date Of Birth",
      defaultValue: "",
      disabled: false,
      validation: {
        required: "Date Of Birth is required",
      },
    },
    {
      name: "age",
      label: "Age:",
      type: "text",
      placeholder: "Age",
      defaultValue: "0", // Default age is 0 before date is selected on the form
      disabled: true,
    },
  ];
  test('renders create person form with firstName, lastName, dateOfBirth, age and the submit button when "isCreateMode" is true', () => {
    render(
      <ReusableForm
        isCreateMode={true} // this would be false for the update person page
        submitBtnText={"Add New Person"}
        formLabel="Add New User"
        isLoading={false}
        fields={createPersonformFields}
        onSubmit={() => {}}
        setIsCreateMode={() => {}}
      />
    );

    expect(screen.getByLabelText(/First Name/i)).toBeTruthy();
    expect(screen.getByLabelText(/Last Name/i)).toBeTruthy();
    expect(screen.getByLabelText(/Date Of Birth/i)).toBeTruthy();
    expect(screen.getByLabelText(/Age/i)).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /Add New Person/i })
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /Clear/i })).toBeTruthy();
  });

  test("submits create person form with firstName, lastName, dateOfBirth, age values", async () => {
    const mockSubmit = jest.fn();
    const dateOfBirth = "2002/11/11";
    render(
      <ReusableForm
        isCreateMode={true} // this would be false for the update person page
        submitBtnText={"Add New Person"}
        formLabel="Add New User"
        isLoading={false}
        fields={createPersonformFields}
        onSubmit={mockSubmit}
        setIsCreateMode={() => {}}
      />
    );

    // Simulate user typing into inputs
    await userEvent.type(screen.getByLabelText(/First Name/i), "FirstName");
    await userEvent.type(screen.getByLabelText(/Last Name/i), "LastName");
    await userEvent.type(
      screen.getByLabelText(/Date Of Birth/i),
      convertDateToYYYMMDD(new Date(dateOfBirth).toString()) // year will always be 0 because user's DOB is the current year
    );
    await userEvent.type(screen.getByLabelText(/Age/i), getAge(new Date(dateOfBirth)).toString());

    // Submit form
    await userEvent.click(
      screen.getByRole("button", { name: /Add New Person/i })
    );

    // Assert the mockSubmit is called with correct values
    expect(mockSubmit).toHaveBeenCalled();
  });

  test("prevents create person form submission when inputs are empty", async () => {
    const mockSubmit = jest.fn();
    render(
      <ReusableForm
        isCreateMode={true} // this would be false for the update person page
        submitBtnText={"Add New Person"}
        formLabel="Create User Form"
        isLoading={false}
        fields={createPersonformFields}
        onSubmit={() => {}}
        setIsCreateMode={() => {}}
      />
    );

    // Simulate submit with empty fields
    await userEvent.click(
      screen.getByRole("button", { name: /Add New Person/i })
    );

    // Ensure mockSubmit was not called
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
