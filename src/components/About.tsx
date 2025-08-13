import type React from "react";
import Navbar from "./navbar";

const About: React.FC = () => {
    return (
        <>
        <div>
            <Navbar/ >
        </div>
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
            <video className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
            autoPlay
            muted
            loop
            playsInline>
                <source src="/public/video/47053-450995419_small.mp4" />
            </video>

            <div className="relative z-10 max-w-3xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-green-700 mb-6">Menyelami Hikmah Al-Qur'an Digital</h1>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Selamat datang di <strong>Al-Qur'an Digital</strong>, wadah modern untuk menjelajahi kitab suci dengan mudah dan penuh makna.
                </p>

                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Kami percaya bahwa teknologi dapat menjadi jembatan untuk mendekatkan setiap jiwa kepada Al-Qur'an. Melalui platform ini, kamu dapat membaca, mencari, dan memahami ayat-ayat suci kapan saja dan dimana saja.
                </p>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Dengan sentuhan digital, kami hadirkan kemudahan akses dan pengalaman interaktif yang mendalam, agar cahaya petunjuk Al-Qur'an senantiasa menyertai langkahmu di era modern.
                </p>

                <p className="italic text-green-800 font-semibold text-lg">
                    "Dan Kami turunkan dari Al-Qur'an sesuatu yang menjadi penawar dan rahmat bagi orang-orang yang beriman."
                    <br />- (QS. Al-Isra: 82)
                </p>
            </div>
        </div>

        <footer className="bg-black text-white text-center p-4">
           &copy; 2025 Al-Qur'an Digital. Semua Hak Dilindungi
        </footer>
        </>
    )
}

export default About