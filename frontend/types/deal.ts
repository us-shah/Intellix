export interface Deal {
  DealID: number;
  CustomerID: number;
  Title: string;
  Amount: number;
  Stage: string;
  ExpectedDate?: string;
  AssignedTo?: number;
}
export type DealCreate = Omit<Deal, "DealID">;
export type DealUpdate = Partial<DealCreate>;
