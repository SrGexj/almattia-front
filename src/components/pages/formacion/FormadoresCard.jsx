import { motion } from "framer-motion"

export const FormadoresCard = ({ formador, index }) => { 

    const containerVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 }
    }

    const imgVariants = {
        rest: { scale: 1, filter: "grayscale(100%)" },
        hover: { scale: 1.03, filter: "grayscale(0%)" }
    }

    return (
        <motion.div
            className="relative flex flex-col gap-3 lg:w-fit h-full items-center rounded-[20px] border-3 overflow-hidden border-[#6f819e]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            
            viewport={{ margin: "0px 0px -250px 0px", once: true }}
        >
            <motion.div
                className="lg:max-w-[250px] aspect-square max-h-[400px] h-full flex flex-col"
                initial="rest"
                whileHover="hover"
                animate="rest"
            >
                <motion.img
                    src={formador.images.featured_image ? formador.images.featured_image.url : '/images/default-trainer.jpg'}
                    alt={formador.name}
                    className="w-full h-full object-cover"
                    variants={imgVariants}
                />
            </motion.div>
            <div className="absolute bg-linear-to-t from-[-50%] from-[#0d121f] w-full h-full top-0 pointer-events-none" />
            <div className="absolute bottom-0 w-full flex flex-col justify-center items-center">
                <h3 className="text-[16px] max-[1025px]:text-[18px] text-center font-light text-white leading-snug">{formador.name}</h3>
                <p className="text-[14px] max-[1025px]:text-[16px] text-center font-light text-[#a2a39f] leading-snug mt-2">{formador.position}</p>
            </div>
        </motion.div>
    )
}