import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import type { Bookmark, Surah } from "./types";

const SurahList: React.FC = () => {
  const [surah, setSurah] = useState<Surah[]>([]);
  const [filteredSurah, setFilteredSurah] = useState<Surah[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios
      .get("https://al-quran-8d642.firebaseio.com/data.json?print=pretty")
      .then((res) => {
        if (!mounted) return;
        const list: Surah[] = Array.isArray(res.data) ? res.data : [];
        setSurah(list);
        setFilteredSurah(list);
      })
      .catch((err) => {
        console.error("Gagal memuat daftar surah:", err);
        setSurah([]);
        setFilteredSurah([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch {
        setBookmarks([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const q = value.trim().toLowerCase();
    if (!q) {
      setFilteredSurah(surah);
    } else {
      setFilteredSurah(surah.filter((s) => s.nama.toLowerCase().includes(q)));
    }
  };

  const isBookmarked = (nomor: number) =>
    bookmarks.some((b) => b.nomor === nomor && b.ayatNumber === undefined);

  const toggleBookmark = (nama: string, nomor: number) => {
    if (isBookmarked(nomor)) {
      setBookmarks((prev) =>
        prev.filter((b) => !(b.nomor === nomor && b.ayatNumber === undefined))
      );
    } else {
      setBookmarks((prev) => [
        ...prev,
        { id: Date.now().toString(), nama, nomor },
      ]);
    }
  };

  return (
    <>
      <div>
        <Navbar onSearch={handleSearch} />

        <div className="max-w-3xl mx-auto p-4 mt-20">
          {loading && <p className="text-gray-500">Loading…</p>}

          {!loading && searchTerm && filteredSurah.length === 0 && (
            <p className="text-gray-500">Surah tidak ditemukan</p>
          )}

          <ul className="space-y-2">
            {filteredSurah.map((item) => (
              <li
                key={item.nomor}
                className="p-3 border rounded-md flex justify-between items-center bg-white"
              >
                <Link
                  to={`/surah/${item.nomor}`}
                  className="text-green-700 hover:underline"
                >
                  {item.nomor}. {item.nama}
                </Link>

                <button
                  type="button"
                  onClick={() => toggleBookmark(item.nama, item.nomor)}
                  aria-label={
                    isBookmarked(item.nomor)
                      ? "Hapus bookmark surah"
                      : "Tambah bookmark surah"
                  }
                  className="ml-3"
                >
                  {isBookmarked(item.nomor) ? (
                    <HiStar className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <HiOutlineStar className="w-6 h-6 text-gray-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="bg-black text-white text-center p-4">
        &copy; 2025 Al-Qur'an Digital. Semua Hak Dilindungi
      </footer>
    </>
  );
};

export default SurahList;

