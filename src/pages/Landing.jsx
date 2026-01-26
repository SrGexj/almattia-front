import ChangableTitle from "../components/ChangableTitle"
import { Link } from "react-router-dom"
import { LandingBlock } from "../components/LandingBlock"
import { use, useContext, useEffect, useState } from "react"
import { PreLoader } from "../components/ui/PreLoader"
import { motion, AnimatePresence } from "framer-motion"
import { PreloaderContext } from "../contexts/PreloaderContext"
import { Instagram } from "lucide-react"
import { AnimatedBackground } from "../components/AnimatedBackground"

export const Landing = () => {

    const { isLoading, loadingProgress, startLoading, stopLoading, updateProgress } = useContext(PreloaderContext)

    const VITE_BPANEL_API  = import.meta.env.VITE_BPANEL_API;
    const VITE_BPANEL_TOKEN  = import.meta.env.VITE_BPANEL_TOKEN;

    const [blocksData, setBlocksData] = useState([])
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    const texts = [
        "Eventos que conectan, inspiran y abren nuevas puertas.",
        "Formación que transforma, nutre el alma y prepara para el éxito."
    ]

    const fetchHomeData = async () => {

        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${VITE_BPANEL_TOKEN}`
            }
        }

        try {
          
            const response = await fetch(`${VITE_BPANEL_API}/home/es`, options)
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const data = await response.json()
            
            setBlocksData(data.data)
            
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            stopLoading()
        }
    }

    useEffect(() => {
        document.querySelector('#smooth-content').style.transform = 'translate(0px, 0px)';
        fetchHomeData()
    }, [blocksData.length]);

    const blocks = [
        {
            title: blocksData ? blocksData.text_link_block_1 : "Eventos",
            imageUrl: "/images/bg-eventos.png",
            linkUrl: blocksData ? blocksData.link_block_1 : "/eventos",
            distribution: "row-span-2",
            backgroundColor: "#a3af91",
            bgPosition: "center"
        },
         {
            title: blocksData ? blocksData.text_link_block_2 : "Formación",
            imageUrl: "/images/bg-formacion.png",
            linkUrl: blocksData ? blocksData.link_block_2 : "/formacion",
            distribution: "row-span-2",
            backgroundColor: "#869cc6",
            bgPosition: "center"
        },
        {
            title: blocksData ? blocksData.text_link_block_3 : "Consultoría",
            imageUrl: "/images/bg-otros.png",
            linkUrl: blocksData ? blocksData.link_block_3 : "/consultoria",
            distribution: "col-span-2",
            backgroundColor: "#cbd5e1",
            bgPosition: "bottom"
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }, 4000) // Cambia cada 4 segundos

        return () => clearInterval(interval)
    }, [])

    return (
        isLoading ? <></> :
        <motion.section 
            className="max-w-[1550px] mx-auto w-full h-screen overflow-hidden pt-35 flex flex-col justify-center items-center font-dm text-center text-white px-15 max-[1200px]:px-8 max-[1025px]:px-5 max-[1025px]:pt-25 max-[768px]:pt-20 max-[768px]:justify-start max-[768px]:h-auto max-[768px]:min-h-[100dvh] max-[768px]:pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="absolute 
                    bg-[conic-gradient(from_0deg,#2b6671,#7d8570,#7d8570,#2b6671)]
                    animate-[spin_15s_linear_infinite] scale-175 h-[150%] max-[1200px]:scale-225 max-[768px]:scale-500 opacity-20 w-full">
            </div>
           {/*  <ChangableTitle 
                titles={[
                    "Eventos que conectan, inspiran y abren nuevas puertas.",
                    "Formación que transforma, nutre el alma y prepara para el éxito."
                ]} 
                time={2000}
                classes={"ml-20 z-10 max-[1025px]:ml-0 h-35 max-[1025px]:mb-5 max-[1025px]:h-[200px]"}
                /> */}
                <div className="w-full flex flex-col text-center items-center justify-start mb-5 max-[1025px]:mb-4 max-[768px]:mb-6 max-[768px]:mt-4 h-[120px] max-[1025px]:h-[110px] max-[768px]:h-[100px] relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={currentTextIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: .6, ease: "easeInOut" }}
                            className="absolute font-ogg! leading-normal text-[40px] max-[1200px]:text-[36px] max-[1025px]:text-[20px] max-[768px]:text-[26px]! max-[768px]:leading-tight"
                        >
                            {texts[currentTextIndex]}
                        </motion.h1>
                    </AnimatePresence>
                </div>
                <div className="absolute w-full h-full top-0 max-[1200px]:scale-150 max-[1025px]:scale-210 left-0" style={{maskImage: 'url(/images/mascara.png)', WebkitMaskImage: 'url(/images/mascara.png)', maskSize: 'cover', WebkitMaskSize: 'cover', maskPosition: 'top', WebkitMaskPosition: 'top', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat'}}>    
                    <div className="absolute rounded-xl inset-0" />
                </div>
            {/* Blocks */}
            <div className="w-full h-full grid grid-cols-2 gap-4 z-10 max-[1200px]:gap-3 max-[768px]:grid-cols-1 max-[768px]:gap-3 max-[768px]:overflow-visible max-[768px]:h-auto max-[768px]:px-2 max-[768px]:mb-6">
                {blocks.map((block, index) => (
                    <LandingBlock
                        key={index}
                        title={block.title}
                        imageUrl={block.imageUrl}
                        linkUrl={block.linkUrl}
                        distribution={block.distribution}
                        backgroundColor={block.backgroundColor}
                        bgPosition={block.bgPosition}
                    />
                ))}
            </div>
            <div className="w-full flex flex-col gap-5 mt-10 justify-center items-center py-5 z-1 text-md text-[#b4abab] max-[1200px]:mt-8 max-[1200px]:gap-4 max-[768px]:mt-6 max-[768px]:gap-3 max-[768px]:py-3 max-[768px]:text-sm">
                <ul className="flex gap-5 max-[1200px]:gap-4 max-[1025px]:flex-wrap max-[1025px]:justify-center max-[768px]:flex-col max-[768px]:gap-2 max-[768px]:items-center">
                    <li>
                        <Link to="/aviso-legal" className="hover:text-[#e1cfcf] transition-all duration-200ms">© Almattia {new Date().getFullYear()}</Link>
                    </li>
                        <span className="w-0.25 bg-white/40 max-[768px]:hidden"></span>
                    <li>
                        <Link to="/aviso-legal" className="hover:text-[#e1cfcf] transition-all duration-200ms">Aviso Legal</Link>
                    </li>
                        <span className="w-0.25 bg-white/40 max-[768px]:hidden"></span>
                    <li>
                        <Link to="/privacidad" className="hover:text-[#e1cfcf] transition-all duration-200ms">Política de privacidad</Link>
                    </li>
                        <span className="w-0.25 bg-white/40 max-[768px]:hidden"></span>
                    <li>
                        <Link to="/cookies" className="hover:text-[#e1cfcf] transition-all duration-200ms">Política de cookies</Link>
                    </li>
                        <span className="w-0.25 bg-white/40 max-[768px]:hidden"></span>
                    <li>
                        <Link to="/cookies" className="hover:text-[#e1cfcf] transition-all duration-200ms">Diseño Bittacora</Link>
                    </li>
                </ul>
                <Link to="/cookies" className="hover:text-[#e1cfcf] transition-all duration-200ms max-[768px]:text-center max-[1025px]:text-sm max-[768px]:text-xs max-[768px]:px-4">
                    Política de Calidad y Gestión Medioambiental
                </Link>
                <div className="flex gap-5 max-[768px]:gap-4">
                    {/* social */}
                    <Link to="#" className="hover:text-[#e1cfcf] transition-all duration-200ms">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 48 48"><g clip-path="url(#a)"><path fill="currentcolor" d="M24 0C10.745 0 0 10.745 0 24c0 11.255 7.75 20.7 18.203 23.293V31.334h-4.95V24h4.95v-3.16c0-8.169 3.697-11.955 11.716-11.955 1.521 0 4.145.298 5.218.596v6.648c-.566-.06-1.55-.09-2.773-.09-3.935 0-5.455 1.492-5.455 5.367V24h7.84L33.4 31.334h-6.49v16.49C38.793 46.39 48 36.271 48 24 48 10.745 37.255 0 24 0"/></g><defs><clipPath id="a"><path fill="currentcolor" d="M0 0h48v48H0z"/></clipPath></defs></svg>
                    </Link>
                    <Link to="#" className="hover:text-[#e1cfcf] transition-all duration-200ms">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 48 48"><g fill="currentcolor" clip-path="url(#clip0_4508_2)"><path d="M24 4.322c6.413 0 7.172.028 9.694.14 2.343.104 3.61.497 4.453.825 1.116.432 1.922.957 2.756 1.791.844.844 1.36 1.64 1.79 2.756.329.844.723 2.12.826 4.454.112 2.53.14 3.29.14 9.693 0 6.413-.028 7.172-.14 9.694-.103 2.344-.497 3.61-.825 4.453-.431 1.116-.957 1.922-1.79 2.756-.845.844-1.642 1.36-2.757 1.791-.844.328-2.119.722-4.453.825-2.532.112-3.29.14-9.694.14-6.413 0-7.172-.028-9.694-.14-2.343-.103-3.61-.497-4.453-.825-1.115-.431-1.922-.956-2.756-1.79-.844-.844-1.36-1.641-1.79-2.757-.329-.844-.723-2.119-.826-4.453-.112-2.531-.14-3.29-.14-9.694 0-6.412.028-7.172.14-9.694.103-2.343.497-3.609.825-4.453.431-1.115.957-1.921 1.79-2.756.845-.844 1.642-1.36 2.757-1.79.844-.329 2.119-.722 4.453-.825 2.522-.113 3.281-.141 9.694-.141M24 0c-6.516 0-7.331.028-9.89.14-2.55.113-4.304.526-5.822 1.116-1.585.619-2.926 1.435-4.257 2.775-1.34 1.332-2.156 2.672-2.775 4.247C.666 9.806.253 11.55.141 14.1.028 16.669 0 17.484 0 24s.028 7.331.14 9.89c.113 2.55.526 4.304 1.116 5.822.619 1.585 1.435 2.925 2.775 4.257a11.7 11.7 0 0 0 4.247 2.765c1.528.591 3.272 1.003 5.822 1.116 2.56.112 3.375.14 9.89.14s7.332-.028 9.891-.14c2.55-.113 4.303-.525 5.822-1.116a11.7 11.7 0 0 0 4.247-2.765 11.7 11.7 0 0 0 2.766-4.247c.59-1.528 1.003-3.272 1.115-5.822.113-2.56.14-3.375.14-9.89s-.027-7.332-.14-9.891c-.112-2.55-.525-4.303-1.115-5.822-.591-1.594-1.407-2.935-2.747-4.266a11.7 11.7 0 0 0-4.247-2.765C38.194.675 36.45.262 33.9.15 31.331.028 30.516 0 24 0"/><path d="M24 11.672c-6.806 0-12.328 5.522-12.328 12.328S17.194 36.328 24 36.328 36.328 30.806 36.328 24 30.806 11.672 24 11.672m0 20.325a7.998 7.998 0 0 1 0-15.994 7.998 7.998 0 0 1 0 15.994m15.694-20.813a2.879 2.879 0 1 1-2.878-2.878 2.885 2.885 0 0 1 2.878 2.878"/></g><defs><clipPath id="clip0_4508_2"><path fill="currentcolor" d="M0 0h48v48H0z"/></clipPath></defs></svg>
                    </Link>
                    <Link to="#" className="hover:text-[#e1cfcf] transition-all duration-200ms">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 48 48"><g clip-path="url(#clip0_4508_8)"><path fill="currentcolor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46v41.07C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0M14.24 40.903H7.116V17.991h7.125zM10.678 14.87a4.127 4.127 0 0 1-4.134-4.125 4.127 4.127 0 0 1 4.134-4.125 4.125 4.125 0 0 1 0 8.25m30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912z"/></g><defs><clipPath id="clip0_4508_8"><path fill="currentcolor" d="M0 0h48v48H0z"/></clipPath></defs></svg>
                    </Link>
                    <Link to="#" className="hover:text-[#e1cfcf] transition-all duration-200ms">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 48 48"><path fill="currentcolor" d="m0 48 3.374-12.326A23.73 23.73 0 0 1 .2 23.782C.206 10.67 10.876 0 23.986 0c6.362.002 12.334 2.48 16.826 6.976a23.65 23.65 0 0 1 6.96 16.828c-.006 13.114-10.676 23.784-23.786 23.784a23.8 23.8 0 0 1-11.376-2.896zm13.194-7.614c3.352 1.99 6.552 3.182 10.784 3.184 10.896 0 19.772-8.868 19.778-19.77.004-10.924-8.83-19.78-19.762-19.784-10.904 0-19.774 8.868-19.778 19.768-.002 4.45 1.302 7.782 3.492 11.268L5.71 42.348zm22.774-10.928c-.148-.248-.544-.396-1.14-.694-.594-.298-3.516-1.736-4.062-1.934-.544-.198-.94-.298-1.338.298-.396.594-1.536 1.934-1.882 2.33s-.694.446-1.288.148-2.51-.924-4.78-2.95c-1.766-1.576-2.96-3.522-3.306-4.118-.346-.594-.036-.916.26-1.212.268-.266.594-.694.892-1.042.302-.344.4-.592.6-.99.198-.396.1-.744-.05-1.042-.15-.296-1.338-3.222-1.832-4.412-.484-1.158-.974-1.002-1.338-1.02l-1.14-.02c-.396 0-1.04.148-1.584.744s-2.08 2.032-2.08 4.958 2.13 5.752 2.426 6.148c.298.396 4.19 6.4 10.152 8.974 1.418.612 2.526.978 3.388 1.252 1.424.452 2.72.388 3.744.236 1.142-.17 3.516-1.438 4.012-2.826.496-1.39.496-2.58.346-2.828"/></svg>
                    </Link>
                </div>
            </div>
        </motion.section>
    )
}