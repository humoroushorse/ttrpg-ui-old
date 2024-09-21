/**
 * Interface for the 'User' data
 */
export interface IUserEntity {
  // id: string | number; // Primary ID
  // name: string;
  uid: string;
  emailVerified: boolean;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
