import { faker } from '@faker-js/faker';


/**
 * Creates a random test user object with a first name, last name, and email address.
 *
 * - The first and last names are generated using the `faker` library.
 *
 * @returns An object containing:
 *   - `firstName`: Random first name.
 *   - `lastName`: Random last name.
 *   - `email`: A generated email address based on the first and last names.
 */
export function createTestUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    email : faker.internet.email({firstName, lastName})
  };
}
