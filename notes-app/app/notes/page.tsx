import { getNotes } from "../services/notes";
import NoteList from "../components/NoteList";

const Notes = () => {
  const notes = getNotes();
  return (
    <div>
      <h2>notes</h2>
      <NoteList notes={notes} />
    </div>
  );
};
export default Notes;
