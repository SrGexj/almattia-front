import ChangableTitle from "../components/ChangableTitle"
import { Link } from "react-router-dom"
import { LandingBlock } from "../components/LandingBlock"

export const Landing = () => {

    const blocks = [
        {
            title: "Eventos",
            imageUrl: "/images/bg-eventos.png",
            linkUrl: "/eventos",
            distribution: "row-span-2",
            backgroundColor: "#a3af91",
            bgPosition: "center"
        },
         {
            title: "Formación",
            imageUrl: "/images/bg-formacion.png",
            linkUrl: "/formacion",
            distribution: "row-span-2",
            backgroundColor: "#869cc6",
            bgPosition: "center"
        },
        {
            title: "Otros servicios",
            imageUrl: "/images/bg-otros.png",
            linkUrl: "/otros-servicios",
            distribution: "col-span-2",
            backgroundColor: "black",
            bgPosition: "bottom"
        }
    ]

    return (
            <section className="relative w-full h-screen overflow-hidden pt-35 flex flex-col justify-center items-center font-dm text-center text-white px-15 max-[1024px]:px-5">
                <ChangableTitle 
                    titles={[
                        "Eventos que conectan, inspiran y abren nuevas puertas.",
                        "Formación que transforma, nutre el alma y prepara para el éxito."
                    ]} 
                    time={2000}
                    classes={"ml-20 z-10 max-[1024px]:ml-0 h-35 max-[1024px]:mb-5"}
                    />
                    <div className="absolute w-full h-full top-0 max-[1024px]:scale-190 left-0" style={{maskImage: 'url(/images/mascara.png)', WebkitMaskImage: 'url(/images/mascara.png)', maskSize: 'cover', WebkitMaskSize: 'cover', maskPosition: 'top', WebkitMaskPosition: 'top', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat'}}>    
                        <div className="absolute rounded-xl inset-0
                        bg-[conic-gradient(from_0deg,#2b6671,#7d8570,#7d8570,#2b6671)]
                        animate-[spin_15s_linear_infinite] scale-175 h-[150%] opacity-30" />
                    </div>
                {/* blocks */}
                <div className="w-full h-full grid grid-cols-2 gap-4 z-10">
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
                <div className="w-full flex justify-center items-center py-5 z-1">
                    <ul className="flex gap-10 text-sm text-[#b4abab]">
                        <li>
                            <Link to="/aviso-legal" className="hover:text-[#e1cfcf] transition-all duration-200ms">Aviso Legal</Link>
                        </li>
                        <li>
                            <Link to="/privacidad" className="hover:text-[#e1cfcf] transition-all duration-200ms">Privacidad</Link>
                        </li>
                        <li>
                            <Link to="/cookies" className="hover:text-[#e1cfcf] transition-all duration-200ms">Cookies</Link>
                        </li>
                    </ul>
                </div>
            </section>
    )
}