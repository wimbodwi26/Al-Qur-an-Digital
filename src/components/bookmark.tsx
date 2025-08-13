import React, { useState, useEffect } from "react";
import type { Bookmark } from "./types";
import { HiTrash } from "react-icons/hi";

const BookmarkApp: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Bookmark</h2>
      <ul>
        {bookmarks.length === 0 && <li>Tidak ada bookmark</li>}
        {bookmarks.map((b) => (
          <li key={b.id} className="flex justify-between border-b py-2">
            <span>
              {b.nama}
              {b.ayatNumber ? ` - Ayat ${b.ayatNumber}` : ""}
            </span>
            <HiTrash
              className="w-5 h-5 text-red-600 cursor-pointer"
              onClick={() => removeBookmark(b.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkApp;
