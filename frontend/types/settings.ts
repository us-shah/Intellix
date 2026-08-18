export interface Setting {
    SettingID: number;
    SettingKey: string;
    SettingValue: string;
    Category: string;
    Description: string;
    UpdatedAt: string;
  }
  
  export interface CreateSetting {
    SettingKey: string;
    SettingValue: string;
    Category: string;
    Description: string;
  }
  
  export interface UpdateSetting {
    SettingKey: string;
    SettingValue: string;
    Category: string;
    Description: string;
  }