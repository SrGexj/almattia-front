import { Link } from "react-router-dom"

export const Button = ({to, text, hover, className, motion, color}) => {

    return (
        hover ? (
        <Link
            to={to}
            className={`w-fit text-white text-[20px] leading-0 flex items-center transition-all duration-300 relative group ${className}`}
        >
            <span className='w-5 h-5 absolute rounded-full group-hover:w-[110%] group-hover:h-10 transition-all duration-300' style={{backgroundColor: color ? color : "#7d8570"}}></span>
            <p className="ml-7 z-1">{text}</p>
        </Link>
        ) : motion ? (
        <motion.Link
            to={to}
            className='text-white text-[20px] leading-0 flex items-center gap-2 transition-all duration-300'
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{ duration: 0.6 }}
            viewport={{ margin: "-450px" }}      
        >
            <span className='w-5 h-5 rounded-full' style={{backgroundColor: color ? color : "#7d8570"}}></span>
            {text}
        </motion.Link>
        ) : (
        <Link
            to={to}
            className='text-white text-[20px] leading-0 flex items-center gap-2 transition-all duration-300'
        >
            <span className='w-5 h-5 rounded-full' style={{backgroundColor: color ? color : "#7d8570"}}></span>
            {text}
        </Link>
        )   
    )
}