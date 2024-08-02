import { validateEmail } from "./validation";

describe("validateEmail", () => {
  it.each([
    {
      value: "test@example.ua",
      expectResult: true,
    },
    {
      value: "test@example.com",
      expectResult: true,
    },
    {
      value: "test@example.ru",
      expectResult: false,
    },
    {
      value: "test@",
      expectResult: false,
    },
    {
      value: "testexample.com",
      expectResult: false,
    },
    {
      value: "test@.com",
      expectResult: false,
    },
    {
      value: "test@com",
      expectResult: false,
    },
    {
      value: "",
      expectResult: false,
    },
    {
      value: "test@.com",
      expectResult: false,
    },
  ])(
    "should return $expectResult. Validation field $value",
    ({ expectResult, value }) => {
      expect(validateEmail(value)).toBe(expectResult);
    }
  );
});
