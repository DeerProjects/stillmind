import { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5276/api/Notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch notes. Are you logged in?");
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Your Notes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {notes.length === 0 ? (
        <p>No notes yet!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
