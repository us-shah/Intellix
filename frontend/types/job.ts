export interface Job {
    JobID: number;
    Title: string;
    Department: string;
    Location: string;
    EmploymentType: string;
    Salary: string;
    Description: string;
    Requirements: string;
    Status: string;
    CreatedAt: string;
  }
  
  export interface JobCreate {
    Title: string;
    Department: string;
    Location: string;
    EmploymentType: string;
    Salary: string;
    Description: string;
    Requirements: string;
    Status: string;
  }
  
  export interface JobUpdate extends JobCreate {}