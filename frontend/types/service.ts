export interface Service {
    ServiceID: number;
    ServiceName: string;
    Description: string;
    Icon: string;
    Status: string;
    CreatedAt: string;
  }
  
  export interface ServiceCreate {
    ServiceName: string;
    Description: string;
    Icon: string;
    Status: string;
  }
  
  export interface ServiceUpdate {
    ServiceName: string;
    Description: string;
    Icon: string;
    Status: string;
  }