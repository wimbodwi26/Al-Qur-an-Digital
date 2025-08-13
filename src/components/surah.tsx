// Surah.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import type { Bookmark, Surah as SurahType } from "./types";

const SurahList: React.FC = () => {
  const [surah, setSurah] = useState<SurahType[]>([]);
  const [filteredSurah, setFilteredSurah] = useState<SurahType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  // Load daftar surah
  useEffect(() => {
    let mounted = true;
    axios
      .get<SurahType[]>("https://api.npoint.io/99c279bb173a6e28359c/data")
      .then((res) => {
        if (!mounted) return;
        setSurah(res.data);
        setFilteredSurah(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  // Load bookmark dari localStorage
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

  // Simpan bookmark ke localStorage saat berubah
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Pencarian
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const q = value.trim().toLowerCase();
    if (!q) {
      setFilteredSurah(surah);
    } else {
      setFilteredSurah(surah.filter((s) => s.nama.toLowerCase().includes(q)));
    }
  };

  // Cek apakah surah sudah di-bookmark (level surah saja — tanpa ayatNumber)
  const isBookmarked = (nomor: number) =>
    bookmarks.some((b) => b.nomor === nomor && b.ayatNumber === undefined);

  // Toggle bookmark (add/remove)
  const toggleBookmark = (nama: string, nomor: number) => {
    if (isBookmarked(nomor)) {
      setBookmarks((prev) =>
        prev.filter((b) => !(b.nomor === nomor && b.ayatNumber === undefined))
      );
    } else {
      const newBookmark: Bookmark = {
        id: Date.now().toString(),
        nama,
        nomor,
      };
      setBookmarks((prev) => [...prev, newBookmark]);
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
