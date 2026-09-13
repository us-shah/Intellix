export interface User {
    UserID: number;
    FullName: string;
    Email: string;
    Phone?: string;
    RoleID: number;
    IsActive: boolean;
    CreatedAt: string;
    UpdatedAt: string;
  }
  
  export interface UserCreate {
    FullName: string;
    Email: string;
    Phone?: string;
    Password: string;
    RoleID: number;
  }
  
  export interface UserUpdate {
    FullName: string;
    Email: string;
    Phone?: string;
    RoleID: number;
    IsActive: boolean;
  }