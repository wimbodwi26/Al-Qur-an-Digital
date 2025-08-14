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

        <div
            className="relative w-full h-screen overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/img/sultan-qaboos-grand-mosque-5963726_1280.jpg')" }}
        >
            
            <div className="absolute inset-0 bg-black/40"></div>

            
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                    <ReactTyped
                        strings={["Al-Qur'an Digital"]}
                        typeSpeed={100}
                        backSpeed={50}
                        loop
                    />
                </h1>
                <p className="max-w-2xl text-lg md:text-xl mt-4">
                    Temukan bacaan dan arti Al-Qur'an dengan mudah dan cepat.
                </p>
                <Link
                    to={`/surah`}
                    className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-lg"
                >
                    Mulai Membaca
                </Link>
            </div>
        </div>

        {/* Footer */}
        <footer className="bg-black text-white text-center p-4">
           &copy; 2025 Al-Qur'an Digital. Semua Hak Dilindungi
        </footer>
        </>
    );
}

export default Home;
