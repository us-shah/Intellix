export interface Blog {
    BlogID: number;
    Title: string;
    Slug: string;
    Summary: string;
    Content: string;
    Image: string;
    Author: string;
    Status: string;
    CreatedAt: string;
  }
  
  export interface BlogCreate {
    Title: string;
    Slug: string;
    Summary: string;
    Content: string;
    Image: string;
    Author: string;
    Status: string;
  }
  
  export interface BlogUpdate {
    Title: string;
    Slug: string;
    Summary: string;
    Content: string;
    Image: string;
    Author: string;
    Status: string;
  }