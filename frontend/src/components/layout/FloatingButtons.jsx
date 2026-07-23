import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";


export default function FloatingButtons() {
    const [visible, setVisible] = useState(false);

    // Mostrar botão quando rolar a página
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll suave para o topo
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">

            {/* Botão WhatsApp */}
            <a
                href="https://wa.me/244952670003"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-lg hover:scale-110"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-6 h-6 fill-white"
                >
                    <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.82.74 5.47 2.034 7.79L.36 31.64l7.69-1.64A15.94 15.94 0 0016 32c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.2c-2.53 0-4.89-.74-6.9-2.02l-.49-.31-4.56.97.97-4.44-.32-.51A13.41 13.41 0 012.6 16.4C2.6 9.12 8.72 3 16 3s13.4 6.12 13.4 13.4S23.28 29.6 16 29.6zm7.37-9.77c-.4-.2-2.36-1.16-2.73-1.29-.36-.13-.63-.2-.9.2-.27.4-1.03 1.29-1.26 1.55-.23.27-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.98-1.18-1.05-1.98-2.35-2.2-2.75-.23-.4-.02-.62.17-.82.17-.17.4-.46.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.23-2.97-.32-.77-.65-.66-.9-.67h-.77c-.27 0-.7.1-1.07.5-.36.4-1.4 1.36-1.4 3.32 0 1.96 1.43 3.86 1.63 4.12.2.27 2.8 4.28 6.8 6 1 .43 1.78.7 2.39.9 1 .32 1.91.27 2.63.17.8-.12 2.36-.96 2.7-1.9.33-.93.33-1.73.23-1.9-.1-.17-.36-.27-.76-.47z" />
                </svg>
            </a>


            {/* Botão Voltar ao Topo */}
            <button
                onClick={scrollToTop}
                className={`w-12 h-12 flex items-center justify-center rounded-full bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}
            >
                <ArrowUpIcon className="w-5 h-5" />
            </button>

        </div>
    );
}
