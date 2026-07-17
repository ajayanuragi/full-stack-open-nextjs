import { getNotes } from "../services/notes";
import Link from "next/link";

const Notes = async ({
  searchParams,
}: {
  searchParams: Promise<{ important?: string }>;
}) => {
  const { important } = await searchParams;
  const showImportant = important === "true";
  const allNotes = getNotes();
  const notes = showImportant
    ? allNotes.filter((note) => note.important)
    : allNotes;

  return (
    <div>
      <h2>notes</h2>
      <div>
        <Link href={showImportant ? "/notes" : "/notes?important=true"}>
          {showImportant ? "show all" : "show important only"}
        </Link>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.content}</Link>
            {note.important && <strong>(important)</strong>}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Notes;
