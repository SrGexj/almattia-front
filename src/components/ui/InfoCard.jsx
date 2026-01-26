import { motion } from "motion/react"

export const InfoCard = ({ title, description, icon, index }) => {
    return (
        <motion.div 
            className="w-full flex flex-col items-start text-white px-8 py-15 bg-[#24272d] border-2 rounded-[20px] border-[#353f4f]"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ margin: "0px 0px -200px 0px", once: true }}
        >
            <img src={icon} alt="" className="max-w-[60px]" />
            <h3 className="text-[30px] font-regular">{title}</h3>
            <p className="text-[20px] font-light text-[#8c8b96]">{description}</p>
        </motion.div>
    )
}