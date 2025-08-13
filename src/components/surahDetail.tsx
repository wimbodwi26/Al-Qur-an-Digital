import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Bookmark } from "./types";
import Navbar from "./navbar";

interface Ayat {
  ar: string;
  id: string;
  nomor: number;
  tr: string;
}

function cleanText(text: string): string {
  if (!text) return "";
  let cleaned = text.replace(/<[^>]*>/g, "");
  const txt = document.createElement("textarea");
  txt.innerHTML = cleaned;
  cleaned = txt.value;
  cleaned = cleaned.replace(/\\u[\dA-Fa-f]{4}/g, (match) =>
    String.fromCharCode(parseInt(match.replace("\\u", ""), 16))
  );
  return cleaned.trim();
}

const SurahDetail: React.FC = () => {
  const { nomor } = useParams<{ nomor: string }>();
  const [nama, setNama] = useState<string>("");
  const [ayatList, setAyatList] = useState<Ayat[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil nama surah dari endpoint data
    axios
      .get(`https://api.npoint.io/99c279bb173a6e28359c/data`)
      .then((res) => {
        const surah = res.data.find((s: any) => s.nomor === Number(nomor));
        if (surah) setNama(surah.nama);
      });

    // Ambil data ayat
    axios
      .get<Ayat[]>(`https://api.npoint.io/99c279bb173a6e28359c/surat/${nomor}`)
      .then((response) => {
        const cleanedData = response.data.map((ayat) => ({
          ...ayat,
          tr: cleanText(ayat.tr),
          id: cleanText(ayat.id),
        }));
        setAyatList(cleanedData);
        setLoading(false);
      });

    // Load bookmark dari localStorage
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, [nomor]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);


  if (loading) return <p>Loading...</p>;

     return (
      <>
      <div>
        <Navbar />
      </div>
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Surah {nomor}</h1>

      {ayatList.map((ayat) => (
        <div
          key={ayat.nomor}
          className="mb-4 p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition"
        >
          <p className="font-arab text-2xl mb-3 leading-relaxed text-right">
            {ayat.ar}
          </p>
          <p className="text-gray-700 italic mb-2">{ayat.tr}</p>
          <p className="text-green-700">{ayat.id}</p>
        </div>
      ))}
    </div>
    <footer className="bg-black text-white text-center p-4">
           &copy; 2025 Al-Qur'an Digital. Semua Hak Dilindungi
        </footer>
    </>
  );
};

export default SurahDetail;
