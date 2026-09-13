export interface Contact {
    ContactID: number;
    FullName: string;
    Email: string;
    Phone: string;
    Subject: string;
    Message: string;
    Status: string;
    CreatedAt: string;
  }
  
  export interface ContactCreate {
    FullName: string;
    Email: string;
    Phone: string;
    Subject: string;
    Message: string;
    Status: string;
  }
  
  export interface ContactUpdate {
    FullName: string;
    Email: string;
    Phone: string;
    Subject: string;
    Message: string;
    Status: string;
  }