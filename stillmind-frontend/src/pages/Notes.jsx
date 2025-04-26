import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/token"; // optional

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = getToken ? getToken() : localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5276/api/Notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch notes.");
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      await axios.post(
        "http://localhost:5276/api/Notes/Create/Note",
        { content: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewNote("");
      fetchNotes();
    } catch (err) {
      console.error(err);
      setError("Failed to create note.");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5276/api/Notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error(err);
      setError("Failed to delete note.");
    }
  };

  const handleLogout = () => {
    removeToken ? removeToken() : localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h1>📝 Your Notes</h1>
        <Button text="Logout" onClick={handleLogout} />
      </div>

      <form onSubmit={handleCreateNote} style={{ marginBottom: "1rem", display: "flex" }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
          style={{
            padding: "0.5rem",
            width: "70%",
            marginRight: "1rem",
          }}
        />
        <Button type="submit" text="Add Note" />
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {notes.length === 0 ? (
        <p>No notes yet! Start writing 👇</p>
      ) : (
        notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
        ))
      )}
    </div>
  );
};

export default Notes;
