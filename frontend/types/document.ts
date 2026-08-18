export interface Document {
    DocumentID: number;
    FileName: string;
    OriginalName: string;
    FileType: string;
    FileSize: number;
    FilePath: string;
    UploadedBy: number;
    CreatedAt: string;
  }
  
  export interface DocumentCreate {
    FileName: string;
    OriginalName: string;
    FileType: string;
    FileSize: number;
    FilePath: string;
    UploadedBy: number;
  }
  
  export interface DocumentUpdate {
    FileName: string;
    OriginalName: string;
    FileType: string;
    FileSize: number;
    FilePath: string;
    UploadedBy: number;
  }