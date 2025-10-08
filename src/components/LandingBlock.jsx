import { useEffect } from "react"
import { Link } from "react-router-dom"

export const LandingBlock = ({ title, imageUrl, linkUrl, distribution, backgroundColor, bgPosition }) => {

    useEffect(() => {
        console.log(backgroundColor, bgPosition)
    }, [backgroundColor, bgPosition])

    return (

        <article className={`rounded-2xl ${distribution} overflow-hidden group`} style={{backgroundColor: backgroundColor}}>
            <Link to={linkUrl} className="relative w-full h-full p-4 flex justify-center flex-col">
                <div 
                    className={`bg-cover w-full h-full absolute left-0 opacity-65 z-0 group-hover:scale-110 transition-all duration-[400ms] group-hover:rotate-1 hover:duration-[400ms] ease-in`}
                    style={{ backgroundPosition: bgPosition, backgroundImage: `url(${imageUrl})` }}
                />
                <h2 className="text-[45px] max-[1024px]:text-[30px] mb-2 z-1">{title}</h2>
            </Link>
        </article>



    )


}