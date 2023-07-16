/**
 * Interface for the 'User' data
 */
export interface UserEntity {
  // id: string | number; // Primary ID
  // name: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
