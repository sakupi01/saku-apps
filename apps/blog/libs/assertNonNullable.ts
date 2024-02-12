type AssertNonNullable<Type> = (
  value: Type,
) => asserts value is NonNullable<Type>;

const ERROR_MESSAGE_NULLABLE =
  "Expected value should be neither null nor undefined.";

export const assertNonNullable: AssertNonNullable<unknown> = (value) => {
  if (!value) {
    throw new Error(ERROR_MESSAGE_NULLABLE);
  }
};
