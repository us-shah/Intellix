export interface Newsletter {
    SubscriberID: number;
    Email: string;
    CreatedAt: string;
  }
  
  export interface NewsletterCreate {
    Email: string;
  }
  
  export interface NewsletterUpdate {
    Email: string;
  }