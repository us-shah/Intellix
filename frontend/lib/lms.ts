import { api } from "@/lib/auth";
import type { Assignment, Course, Enrollment, Lesson, MyCourse, Submission } from "@/types/lms";

export const lmsApi = {
  courses: async () => (await api.get<Course[]>("/lms/courses")).data,
  course: async (id:number) => (await api.get<Course>(`/lms/courses/${id}`)).data,
  createCourse: async (body:Partial<Course>) => (await api.post<Course>("/lms/courses", body)).data,
  updateCourse: async (id:number, body:Partial<Course>) => (await api.put<Course>(`/lms/courses/${id}`, body)).data,
  lessons: async (courseId:number) => (await api.get<Lesson[]>(`/lms/courses/${courseId}/lessons`)).data,
  addLesson: async (courseId:number, body:Partial<Lesson>) => (await api.post<Lesson>(`/lms/courses/${courseId}/lessons`, body)).data,
  enrollments: async () => (await api.get<Enrollment[]>("/lms/enrollments")).data,
  enroll: async (StudentID:number, CourseID:number) => (await api.post("/lms/enrollments", {StudentID,CourseID})).data,
  myCourses: async () => (await api.get<MyCourse[]>("/lms/my-courses")).data,
  assignments: async (courseId?:number) => (await api.get<Assignment[]>("/lms/assignments", {params:courseId?{course_id:courseId}:{}})).data,
  myAssignments: async () => (await api.get<Assignment[]>("/lms/my-assignments")).data,
  createAssignment: async (body:Partial<Assignment>) => (await api.post<Assignment>("/lms/assignments", body)).data,
  submissions: async () => (await api.get<Submission[]>("/lms/submissions")).data,
  mySubmissions: async () => (await api.get<Submission[]>("/lms/my-submissions")).data,
  submit: async (assignmentId:number, body:{AnswerText?:string;AttachmentURL?:string}) => (await api.post(`/lms/assignments/${assignmentId}/submit`,body)).data,
  grade: async (submissionId:number, body:{Marks:number;Feedback?:string}) => (await api.put(`/lms/submissions/${submissionId}/grade`,body)).data,
};
