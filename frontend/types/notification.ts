export interface Notification {
    NotificationID: number;
    UserID: number;
    Title: string;
    Message: string;
    IsRead: boolean;
  }
  
  export interface NotificationCreate {
    UserID: number;
    Title: string;
    Message: string;
    IsRead?: boolean;
  }
  
  export interface NotificationUpdate {
    UserID: number;
    Title: string;
    Message: string;
    IsRead: boolean;
  }