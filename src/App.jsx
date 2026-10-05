import { useEffect, useState } from "react";

// The page loads its data from public/student.json.
// That same file is also served at /student.json as a small JSON API.
export default function App() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/student.json")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(setStudent)
      .catch((err) => setError(`Could not load /student.json (${err.message}).`));
  }, []);

  if (error) return <main className="page"><p>{error}</p></main>;
  if (!student) return <main className="page"><p>Loading…</p></main>;

  return (
    <main className="page">
      <section className="card" aria-label="Student information">
        <header className="card-header">Utah Valley University</header>

        <div className="card-body">
          <p className="field-label">Name</p>
          <h1 className="name">{student.full_name}</h1>

          <p className="field-label">Student ID</p>
          <p className="student-id">{student.student_id}</p>
        </div>

        <footer className="card-footer">{student.course}</footer>
      </section>

      <p className="caption">{student.message}</p>
      <p className="caption meme">“{student.meme}”</p>
    </main>
  );
}
