export interface ActivityLog { ActivityID:number; UserID?:number|null; Action:string; TableName?:string|null; RecordID?:number|null; ActionTime?:string|null; Details?:string|null }
export interface ActivityLogCreate { UserID?:number|null; Action:string; TableName?:string|null; RecordID?:number|null; Details?:string|null }
export type ActivityLogUpdate = Partial<ActivityLogCreate>;
