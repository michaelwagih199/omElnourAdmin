export class User {
    id: number;
  userName: string;
  password: string;
  createdDate: string;
  roles: Role[];
  permissions: any[];
}
export interface Role {
    id: number;
    roleName: string;
    permissions: Permission[];
  }
  
  export interface Permission {
    id: number;
    codeName: string;
  }
