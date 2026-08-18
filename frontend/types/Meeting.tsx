export interface Meeting {
    MeetingID: number;
    Title: string;
    Description?: string;
    MeetingDate: string;
    MeetingTime: string;
    Location?: string;
    Status: string;
    OrganizerID: number;
    CreatedAt: string;
  }
  
  export interface MeetingCreate {
    Title: string;
    Description?: string;
    MeetingDate: string;
    MeetingTime: string;
    Location?: string;
    Status?: string;
    OrganizerID: number;
  }
  
  export interface MeetingUpdate {
    Title?: string;
    Description?: string;
    MeetingDate?: string;
    MeetingTime?: string;
    Location?: string;
    Status?: string;
    OrganizerID?: number;
  }