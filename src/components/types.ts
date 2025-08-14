export interface Surah {
  nomor: number;
  nama: string;
  arti: string;
  ayat: number;
  type: string;
  audio: string;
  keterangan: string;
}

export interface Ayat {
  ar: string;
  id: string;
  nomor: number;
  tr: string;
}

export interface Bookmark {
  id: string;
  nomor: number;
  nama: string;
  ayatNumber?: number;
}


