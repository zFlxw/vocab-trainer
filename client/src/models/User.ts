/**
 * This interface represents a user model, which is provided by the backend.
 */
export interface User {

  /**
   * The user's id.
   */
  id: number;

  /**
   * The user's name.
   */
  username: string;

  /**
   * The user's email.
   */
  email: string;
}
