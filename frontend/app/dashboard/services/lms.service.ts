import api from "@/lib/api";

export interface Course {
  CourseID: number;
  Title: string;
  Slug: string;
  ShortDescription?: string;
  Description?: string;
  Thumbnail?: string;
  Price: number;
  Level: string;
  Status: string;
  InstructorID?: number;
  IsPublished: boolean;
}

export interface CourseCreate {
  Title: string;
  Slug: string;
  ShortDescription?: string;
  Description?: string;
  Thumbnail?: string;
  Price?: number;
  Level?: string;
  Status?: string;
  InstructorID?: number;
  IsPublished?: boolean;
}

export interface Lesson {
  LessonID: number;
  CourseID: number;
  Title: string;
  Content?: string;
  VideoURL?: string;
  ResourceURL?: string;
  SortOrder: number;
  IsPreview: boolean;
}

export async function getCourses(): Promise<Course[]> {
  const response = await api.get<Course[]>(
    "/lms/courses"
  );

  return response.data;
}

export async function getCourse(
  courseId: number
): Promise<Course> {
  const response = await api.get<Course>(
    `/lms/courses/${courseId}`
  );

  return response.data;
}

export async function createCourse(
  payload: CourseCreate
): Promise<Course> {
  const response = await api.post<Course>(
    "/lms/courses",
    payload
  );

  return response.data;
}

export async function updateCourse(
  courseId: number,
  payload: Partial<CourseCreate>
): Promise<Course> {
  const response = await api.put<Course>(
    `/lms/courses/${courseId}`,
    payload
  );

  return response.data;
}

export async function getLessons(
  courseId: number
): Promise<Lesson[]> {
  const response = await api.get<Lesson[]>(
    `/lms/courses/${courseId}/lessons`
  );

  return response.data;
}

export async function createLesson(
  courseId: number,
  payload: Partial<Lesson>
): Promise<Lesson> {
  const response = await api.post<Lesson>(
    `/lms/courses/${courseId}/lessons`,
    payload
  );

  return response.data;
}

export async function getMyCourses() {
  const response = await api.get(
    "/lms/my-courses"
  );

  return response.data;
}

export async function getAssignments() {
  const response = await api.get(
    "/lms/assignments"
  );

  return response.data;
}

export async function getSubmissions() {
  const response = await api.get(
    "/lms/submissions"
  );

  return response.data;
}