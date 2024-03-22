export const UserRole = {
  User: 1,
  Instructor: 2,
  Admin: 3,
} as const

export type IUserRole = (typeof UserRole)[keyof typeof UserRole]

export const UserRoleText = {
  [UserRole.User]: 'User',
  [UserRole.Instructor]: 'Instructor',
  [UserRole.Admin]: 'Admin',
} as const
