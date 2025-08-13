import { ReactTyped } from "react-typed";
import Navbar from "./navbar";
import type React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <>
        <div className="relative z-50">
            <Navbar />
        </div>
        <div className="relative w-full h-screen overflow-hidden">
            <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/public/video/124062-729835809_small.mp4" />
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                    <ReactTyped
                    strings={["Al-Qur'an Digital"]}
                    typeSpeed={100}
                    backSpeed={50}
                    loop />
                    </h1>
                <p className="max-w-2xl teext-lg md:text-xl">Temukan bacaan dan arti Al-Qur'an dengan mudah dan cepat.</p>
                <Link to={`/surah`} className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-lg">Mulai Membaca</Link>
            </div>
        </div>

        <footer className="bg-black text-white text-center p-4">
           &copy; 2025 Al-Qur'an Digital. Semua Hak Dilindungi
        </footer>
        </>
    )
}

export default Home