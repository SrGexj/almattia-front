import { ArrowBigRight, ArrowLeft, ArrowRight, MoveRight } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export const LandingBlock = ({ title, imageUrl, linkUrl, distribution, backgroundColor, bgPosition }) => {

    useEffect(() => {

    }, [backgroundColor, bgPosition])

    return (

        <article className={`rounded-2xl ${distribution} overflow-hidden group max-[768px]:row-span-1 max-[768px]:col-span-1 max-[768px]:min-h-[200px]`} >
            <Link to={linkUrl} className="relative w-full h-full p-4 flex justify-center items-center flex-col max-[768px]:p-3">
                <div 
                    className={`bg-cover w-full h-full absolute left-0 opacity-65 z-0 group-hover:scale-110 transition-all duration-700 group-hover:rotate-1 hover:duration-700ms `}
                    style={{ backgroundPosition: bgPosition, backgroundImage: `url(${imageUrl})` }}
                />
                <div className="absolute inset-0 opacity-55 group-hover:opacity-75 transition-all duration-300" style={{ backgroundColor: backgroundColor}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <h2 className="group-hover:-translate-y-5 translate-y-5 text-[45px] max-[1025px]:text-[30px] max-[768px]:text-[28px] mb-2 z-1 group-hover:tracking-wider transition-all duration-500">{title}</h2>
                <span className="invisible opacity-0 group-hover:opacity-60 group-hover:visible group-hover:-translate-y-5 z-1 w-12 h-12 border-2 rounded-full flex justify-center items-center transition-all duration-500 max-[768px]:w-10 max-[768px]:h-10">
                    <MoveRight className="stroke-2" />
                </span>
                <div className="absolute w-0 group-hover:w-full group-hover:opacity-100 h-1 bottom-0 left-1/2 -translate-x-1/2 transition-all duration-400 opacity-0" style={{backgroundColor: backgroundColor}}></div>
            </Link>
        </article>



    )


}