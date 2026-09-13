import LmsShell from"@/components/lms/LmsShell";import{PageTitle}from"@/components/lms/Ui";import CourseEditor from"@/components/lms/CourseEditor";
export default function Page(){return <LmsShell mode="admin"><PageTitle title="Create course" description="Create the course, assign an instructor, then add lessons and enroll students."/><CourseEditor/></LmsShell>}
