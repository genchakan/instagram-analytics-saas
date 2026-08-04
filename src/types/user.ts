export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
}
