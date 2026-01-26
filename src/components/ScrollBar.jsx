import { useEffect, useRef, useState } from "react";
import { usePageScroll } from "../contexts/PageScrollContext";
import { Link, useLocation} from "react-router-dom";
import { is } from "react-day-picker/locale";

const pages = [
    { id: "eventos", color: "#7d8570" },
    { id: "formacion", color: "#4d5d77" },
    { id: "otros-servicios", color: "#F7FAFC" }
];

export const ScrollBar = ({id}) => {
    const containerRef = useRef(null);
    const { registerScrollbar, currentPage } = usePageScroll();
    const [scrollProgress, setScrollProgress] = useState(0);


    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    const { pathname } = useLocation();

    // Referencia para almacenar los handlers de mousemove
    const mouseHandlersRef = useRef({});

    const tagFollowMouse = (id) => {
        const tag = document.querySelector(`.tag[data-id="${id}"]`);
        const bridge = tag?.parentElement?.querySelector('.bridge');
        const parentLink = tag?.parentElement;
        if (!tag || !parentLink) return;

        const mouseMoveHandler = (e) => {
            // Obtener la posición del elemento padre (la barra)
            const rect = parentLink.getBoundingClientRect();
            const y = e.clientY;
            
            // Calcular la posición relativa dentro del contenedor
            const relativeY = y - rect.top;
            
            // Mover el tag verticalmente manteniendo su posición horizontal
            tag.style.top = `${relativeY}px`;
            tag.style.transform = 'translateY(-50%)';
            
            // Mover el puente también
            if (bridge) {
                bridge.style.top = `${relativeY}px`;
            }
        };
        
        // Guardar el handler para poder removerlo después
        mouseHandlersRef.current[id] = mouseMoveHandler;
        window.addEventListener('mousemove', mouseMoveHandler);
    };

    const tagLeaveMouse = (id) => {
        const tag = document.querySelector(`.tag[data-id="${id}"]`);
        const bridge = tag?.parentElement?.querySelector('.bridge');
        if (!tag) return;
        
        // Remover el handler específico guardado
        const handler = mouseHandlersRef.current[id];
        if (handler) {
            window.removeEventListener('mousemove', handler);
            delete mouseHandlersRef.current[id];
        }
        
        // Resetear la posición del tag y puente al centro
        tag.style.top = '50%';
        tag.style.transform = 'translateY(-50%)';
        
        if (bridge) {
            bridge.style.top = '50%';
        }
    };

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
            className={`left-4 max-[1441px]:left-3 max-[1200px]:left-2 w-9 px-3 py-5 max-[1200px]:px-2 max-[1200px]:py-4 hover:w-15 transition-all duration-300 h-[85%] max-[1200px]:h-[80%] mt-10 max-[1200px]:mt-8 rounded-full top-1/2 -translate-y-1/2 bg-[#7d867040] backdrop-blur-sm gap-4 max-[1200px]:gap-3 fixed z-11 flex flex-col justify-center items-center max-[1025px]:!w-[95%] max-[1025px]:left-1/2 max-[1025px]:-translate-x-1/2 max-[1025px]:px-5 max-[1025px]:py-3 max-[1025px]:!h-14 max-[1025px]:bottom-4 max-[1025px]:top-auto max-[1025px]:translate-y-0 max-[1025px]:flex-row max-[1025px]:mt-0 max-[768px]:!h-12 max-[768px]:bottom-3 ${visibilityClass}`}
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
                const ballPositionMov = 8 + scrollProgress * 84;
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
                        className="relative min-w-[12px] max-[1200px]:min-w-[10px] max-[1025px]:min-w-[50px] transition-all duration-300 rounded-full flex justify-center items-center group"
                        style={{
                            // Ajuste de altura y anchura condicional
                            height: isMobile ? "60%" : (currentPage === page.id ? "35%" : "100%"),
                            width: isMobile ? (currentPage === page.id ? "35%" : "100%") : "60%",
                            backgroundColor: page.color,
                        }}

                    >
                        {/* Tag con forma que "sale" de la barra - Solo desktop */}
                        {!isMobile && (
                            <div data-id={page.id} className="after:absolute after:left-0.25 after:-translate-x-full after:top-1/2 after:-translate-y-1/2 after:w-0 after:h-0 after:border-t-[8px] after:border-t-transparent after:border-b-[8px] after:border-b-transparent after:border-r-[8px] tag left-full translate-x-2 top-1/2 -translate-y-1/2 absolute shadow-xl px-3 py-1.5 max-[1200px]:px-2 max-[1200px]:py-1 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity] duration-300 text-white font-semibold text-sm max-[1200px]:text-xs" style={{ 
                                color: page.id === "otros-servicios" ? "#000" : "#fff",
                                backgroundColor: page.color,
                                borderRadius: '12px',
                            }}>
                                <style jsx>{`
                                    .tag[data-id="${page.id}"]::after {
                                        border-right-color: ${page.color};
                                    }
                                `}</style>
                                {page.id.replace("-", " ").toUpperCase()}
                            </div>
                        )}
                        <div 
                            // Mostrar la bolita solo si estamos en una de las 3 páginas clave
                            className={`absolute w-4 h-4 max-[1200px]:w-3 max-[1200px]:h-3 max-[768px]:w-2.5 max-[768px]:h-2.5 shadow-[0_0_5px_rgba(0,0,0,0.5)] bg-white rounded-full transition-opacity duration-300 ${
                                (currentPage === page.id && showBallIndicator) ? "opacity-100 visible" : "opacity-0 invisible"
                            }`}
                            style={ballStyle}
                        >
                        </div>
                    </Link>
                );
            })}
        </aside>
    );
};