import { useEffect, useRef, useState } from "react";
import { usePageScroll } from "../contexts/PageScrollContext";
import { Link, useLocation} from "react-router-dom";

const pages = [
    { id: "eventos", color: "#7d8570" },
    { id: "formacion", color: "#353f4f" },
    { id: "otros-servicios", color: "#8a7f6d" }
];

export const ScrollBar = ({id}) => {
    
    const containerRef = useRef(null);
    const { registerScrollbar, currentPage } = usePageScroll();
    const [scrollProgress, setScrollProgress] = useState(0);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    const { pathname } = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onPageScroll = () => {
        // Usa document.documentElement para mayor compatibilidad
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY || document.documentElement.scrollTop; // Mayor compatibilidad

        if (scrollableHeight <= 0) {
            setScrollProgress(0);
            return;
        }
        // Usa el scroll más compatible
        const scrollTotal = currentScroll / scrollableHeight; 
        setScrollProgress(scrollTotal);
    };

    useEffect(() => {
        window.addEventListener('scroll', onPageScroll);
        return () => window.removeEventListener('scroll', onPageScroll);
    }, []);

    const isHome = pathname === "/";

    const visibilityClass = isHome 
        ? 'opacity-0 invisible pointer-events-none' 
        : 'opacity-100 visible pointer-events-auto';

    const showBallIndicator = pages.map(page => page.id).includes(currentPage);

    return (
        <aside 
            id={id}
            ref={containerRef} 
            className={`w-10 hover:w-15 transition-all duration-300 h-screen bg-white gap-4 fixed z-11 flex flex-col justify-center items-center py-1 max-[1024px]:!w-full max-[1024px]:px-5 max-[1024px]:!h-10 max-[1024px]:bottom-0 max-[1024px]:flex-row ${visibilityClass}`}
        >
            {pages.map((page) => {
                const ref = useRef(null);

                useEffect(() => {
                    // La bolita solo se registra si estamos en esas páginas, 
                    // aunque los enlaces siempre estén visibles.
                    if (showBallIndicator) {
                        registerScrollbar(page.id, ref);
                    }
                }, [page.id, registerScrollbar, showBallIndicator]);

                // Lógica para calcular la posición de la bolita
                const ballPositionMov = 15 + scrollProgress * 68;
                const ballPosition = 7 + scrollProgress * 86;

                // Objeto de estilos que cambia según si es móvil o no
                const ballStyle = isMobile
                    ? { // Estilos para MÓVIL (movimiento horizontal)
                        left: `${ballPositionMov}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }
                    : { // Estilos para ESCRITORIO (movimiento vertical)
                        top: `${ballPosition}%`,
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      };

                return (
                    <Link
                        to={page.id}
                        key={page.id}
                        ref={ref}
                        className="relative transition-all duration-300 rounded-full flex justify-center items-center"
                        style={{
                            // Ajuste de altura y anchura condicional
                            height: isMobile ? "50%" : (currentPage === page.id ? "35%" : "100%"),
                            width: isMobile ? (currentPage === page.id ? "35%" : "100%") : "50%",
                            backgroundColor: page.color,
                        }}
                    >
                        <div 
                            // Mostrar la bolita solo si estamos en una de las 3 páginas clave
                            className={`absolute w-3 h-3 bg-white rounded-full transition-opacity duration-300 ${
                                (currentPage === page.id && showBallIndicator) ? "opacity-100 visible" : "opacity-0 invisible"
                            }`}
                            style={ballStyle} // Aplicamos los estilos dinámicos
                        >
                        </div>
                    </Link>
                );
            })}
        </aside>
    );
};