export type CurrentUser = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  roles: string[];
  permissions: string[];
};

let currentUser: CurrentUser | null = null;

export function setCurrentUser(user: CurrentUser): void {
  currentUser = user;
}

export function getCurrentUser(): CurrentUser | null {
  return currentUser;
}

export function clearCurrentUser(): void {
  currentUser = null;
}
