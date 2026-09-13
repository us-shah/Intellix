export interface Setting { SettingID:number; SettingKey:string; SettingValue?:string|null; Description?:string|null; Category?:string|null }
export interface CreateSetting { SettingKey:string; SettingValue?:string|null; Description?:string|null; Category?:string|null }
export type UpdateSetting = Partial<CreateSetting>;
