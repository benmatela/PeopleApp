import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReusableForm from "../../components/forms/reusable-form/ReusableForm";

describe("ReusableForm", () => {
  const createPersonformFields = [
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
        submitBtnText={"Submit"}
        formLabel="Create User Form"
        isLoading={false}
        fields={createPersonformFields}
        onSubmit={() => {}}
        setIsCreateMode={() => {}}
      />
    );

    expect(screen.getByLabelText(/firstName/i)).toBeTruthy();
    expect(screen.getByLabelText(/lastName/i)).toBeTruthy();
    expect(screen.getByLabelText(/dateOfBirth/i)).toBeTruthy();
    expect(screen.getByLabelText(/age/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /submit/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /clear/i })).toBeTruthy();
  });

  test("submits create person form with firstName, lastName, dateOfBirth, age values", async () => {
    const mockSubmit = jest.fn();
    render(
      <ReusableForm
        isCreateMode={true} // this would be false for the update person page
        submitBtnText={"Submit"}
        formLabel="Create User Form"
        isLoading={false}
        fields={createPersonformFields}
        onSubmit={() => {}}
        setIsCreateMode={() => {}}
      />
    );

    // Simulate user typing into inputs
    await userEvent.type(screen.getByLabelText(/firstName/i), "FirstName");
    await userEvent.type(screen.getByLabelText(/lastName/i), "LastName");
    await userEvent.type(screen.getByLabelText(/dateOfBirth/i), "2002/03/04");
    await userEvent.type(screen.getByLabelText(/age/i), "0");

    // Submit form
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert the mockSubmit is called with correct values
    expect(mockSubmit).toHaveBeenCalledWith({
      firstName: "FirstName",
      lastName: "LastName",
      dateOfBirth: "2002/03/04",
      age: "0",
    });
  });

  test("prevents create person form submission when inputs are empty", async () => {
    const mockSubmit = jest.fn();
    render(
      <ReusableForm
        isCreateMode={true} // this would be false for the update person page
        submitBtnText={"Submit"}
        formLabel="Create User Form"
        isLoading={false}
        fields={createPersonformFields}
        onSubmit={() => {}}
        setIsCreateMode={() => {}}
      />
    );

    // Simulate submit with empty fields
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    // Ensure mockSubmit was not called
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
