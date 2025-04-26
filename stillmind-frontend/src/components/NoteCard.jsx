// src/components/NoteCard.jsx

const NoteCard = ({ note, onDelete }) => (
    <div className="bg-white text-black p-4 rounded-lg mb-4 flex justify-between items-center shadow">
      <span>{note.content || note.noteContent || "No content"}</span>
      <button
        onClick={() => onDelete(note.id)}
        className="text-red-500 hover:underline ml-4"
      >
        Delete
      </button>
    </div>
  );
  
  export default NoteCard;
  