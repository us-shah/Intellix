"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Submission {
  SubmissionID: number;
  AssignmentID: number;
  StudentID: number;
  Status: string;
  Marks?: number;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const res = await api.get("/lms/submissions");
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to load submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Submissions</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Assignment</th>
            <th>Student</th>
            <th>Status</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((item) => (
            <tr key={item.SubmissionID}>
              <td>{item.SubmissionID}</td>
              <td>{item.AssignmentID}</td>
              <td>{item.StudentID}</td>
              <td>{item.Status}</td>
              <td>{item.Marks ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}