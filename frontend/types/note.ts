export interface Note {
    NoteID: number;
    CustomerID?: number | null;
    LeadID?: number | null;
    DealID?: number | null;
    NoteText: string;
    CreatedBy: number;
  }
  
  export interface NoteCreate {
    CustomerID?: number | null;
    LeadID?: number | null;
    DealID?: number | null;
    NoteText: string;
    CreatedBy: number;
  }
  
  export interface NoteUpdate {
    CustomerID?: number | null;
    LeadID?: number | null;
    DealID?: number | null;
    NoteText: string;
    CreatedBy: number;
  }