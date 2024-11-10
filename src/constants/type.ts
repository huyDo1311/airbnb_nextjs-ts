export const Role = {
    User: 'USER',
    Admin: 'ADMIN',
  } as const
  
  export const RoleValues = [Role.User, Role.Admin] as const