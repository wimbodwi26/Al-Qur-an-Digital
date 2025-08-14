import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import type { Ayat, Bookmark, Surah } from "./types";

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
  const [nama, setNama] = useState("");
  const [ayatList, setAyatList] = useState<Ayat[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        
        const surahRes = await axios.get<Surah[]>(
          "https://al-quran-8d642.firebaseio.com/data.json?print=pretty"
        );
       
        const surah = surahRes.data.find((s) => s.nomor == Number(nomor));
        if (surah) setNama(surah.nama);

        
        const ayatRes = await axios.get<Ayat[]>(
          `https://al-quran-8d642.firebaseio.com/surat/${nomor}.json?print=pretty`
        );

        const cleanedData = ayatRes.data.map((ayat) => ({
          ...ayat,
          tr: cleanText(ayat.tr),
          id: cleanText(ayat.id),
        }));

        setAyatList(cleanedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAyatList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();

    
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch {
        setBookmarks([]);
      }
    }
  }, [nomor]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {nama ? `Surah ${nama}` : `Surah ${nomor}`}
        </h1>

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
