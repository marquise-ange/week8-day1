
import { useEffect, useState } from 'react';

// PART B: TITLE MIRROR
function TitleMirror() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    document.title = title.trim() || 'Effects Lab';
  }, [title]);

  return (
    <section>
      <h2>1. Title Mirror</h2>
      <label>
        Tab title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a page title"
        />
      </label>
    </section>
  );
}

// PART C: SAVED NOTE
function SavedNote() {
  const [note, setNote] = useState(() => {
    try {
      return localStorage.getItem('lab-note') ?? '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lab-note', note);
    } catch (error) {
      console.error('Could not save note:', error);
    }
  }, [note]);

  return (
    <section>
      <h2>2. Saved Note</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your note here..."
      />
      <button onClick={() => setNote('')}>
        Clear saved note
      </button>
    </section>
  );
}

// PART D: LIVE CLOCK
function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <section>
      <h2>3. Live Clock</h2>
      <p>{time.toLocaleTimeString()}</p>
    </section>
  );
}

// MAIN APP
export default function App() {
  const [showClock, setShowClock] = useState(true);

  return (
    <main style={{
      maxWidth: '640px',
      margin: '30px auto',
      padding: '20px',
      fontFamily: 'Arial'
    }}>
      <h1>Effects Lab</h1>
      <p>Three examples of synchronizing React with the browser.</p>

      <TitleMirror />

      <hr />

      <SavedNote />

      <hr />

      <button onClick={() => setShowClock(!showClock)}>
        {showClock ? 'Hide clock' : 'Show clock'}
      </button>

      {showClock && <LiveClock />}
    </main>
  );
}
