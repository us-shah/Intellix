export interface Project {
    ProjectID: number;
    ProjectName: string;
    Description: string;
    CustomerID: number;
    ManagerID: number;
    Status: string;
    StartDate: string;
    EndDate: string;
    CreatedAt: string;
  }
  
  export interface ProjectCreate {
    ProjectName: string;
    Description: string;
    CustomerID: number;
    ManagerID: number;
    Status: string;
    StartDate: string;
    EndDate: string;
  }
  
  export interface ProjectUpdate {
    ProjectName: string;
    Description: string;
    CustomerID: number;
    ManagerID: number;
    Status: string;
    StartDate: string;
    EndDate: string;
  }