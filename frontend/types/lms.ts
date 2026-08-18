export type Course = {
  CourseID: number;
  Title: string;
  Slug: string;
  ShortDescription?: string | null;
  Description?: string | null;
  Thumbnail?: string | null;
  Price: number | string;
  Level: string;
  Status: string;
  InstructorID?: number | null;
  IsPublished: boolean;
  CreatedAt?: string;
};
export type Lesson = { LessonID:number; CourseID:number; Title:string; Content?:string|null; VideoURL?:string|null; ResourceURL?:string|null; SortOrder:number; IsPreview:boolean };
export type Enrollment = { EnrollmentID:number; StudentID:number; CourseID:number; Status:string; ProgressPercent:number; EnrolledAt?:string; student?:{UserID:number;FullName:string;Email:string}; course?:Course };
export type Assignment = { AssignmentID:number; CourseID:number; Title:string; Instructions?:string|null; DueAt?:string|null; MaxMarks:number|string; CreatedAt?:string; course?:Course };
export type Submission = { SubmissionID:number; AssignmentID:number; StudentID:number; AnswerText?:string|null; AttachmentURL?:string|null; Marks?:number|null; Feedback?:string|null; Status:string; SubmittedAt?:string; GradedAt?:string|null; student?:{UserID:number;FullName:string;Email:string}; assignment?:Assignment };
export type MyCourse = { enrollment_id:number; status:string; progress:number; course:Course };
