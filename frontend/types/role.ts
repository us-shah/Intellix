export interface Role {
    RoleID: number;
    RoleName: string;
    Description: string;
    CreatedAt: string;
  }
  
  export interface RoleCreate {
    RoleName: string;
    Description: string;
  }
  
  export interface RoleUpdate extends RoleCreate {}