// Обновите путь в соответствии с вашей структурой проекта
import { FormFields } from "../features/ContactForm/components/types";
import { returnContactData } from "./returnContactData";

describe("returnContactData", () => {
  it("should return the correct data structure", () => {
    // Arrange
    const mockFormFields: FormFields = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    };

    // Act
    const result = returnContactData(mockFormFields);

    // Assert
    expect(result).toEqual({
      avatar_url:
        "https://img.freepik.com/free-photo/close-up-on-kitten-surrounded-by-flowers_23-2150782325.jpg?w=360&t=st=1722548958~exp=1722549558~hmac=fdd6cb71f68a977ada2a2ebc78742a062266192378cc246c54806ca62f49bb3a",
      fields: {
        "first name": [
          {
            value: "John",
            modifier: "",
            label: "first name",
          },
        ],
        "last name": [
          {
            value: "Doe",
            modifier: "",
            label: "last name",
          },
        ],
        email: [
          {
            value: "john.doe@example.com",
            modifier: "",
            label: "email",
          },
        ],
      },
      record_type: "person",
      privacy: {
        edit: null,
        read: null,
      },
      owner_id: null,
    });
  });

  it("should handle empty values", () => {
    // Arrange
    const mockFormFields: FormFields = {
      firstName: "",
      lastName: "",
      email: "",
    };

    // Act
    const result = returnContactData(mockFormFields);

    // Assert
    expect(result).toEqual({
      avatar_url:
        "https://img.freepik.com/free-photo/close-up-on-kitten-surrounded-by-flowers_23-2150782325.jpg?w=360&t=st=1722548958~exp=1722549558~hmac=fdd6cb71f68a977ada2a2ebc78742a062266192378cc246c54806ca62f49bb3a",
      fields: {
        "first name": [
          {
            value: "",
            modifier: "",
            label: "first name",
          },
        ],
        "last name": [
          {
            value: "",
            modifier: "",
            label: "last name",
          },
        ],
        email: [
          {
            value: "",
            modifier: "",
            label: "email",
          },
        ],
      },
      record_type: "person",
      privacy: {
        edit: null,
        read: null,
      },
      owner_id: null,
    });
  });
});
