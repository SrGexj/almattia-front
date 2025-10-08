import { ImageWithFallback } from "./utils/ImageWithFallback";
import { motion } from "motion/react";

export function TeamMember(props) {
    const { name, role, imageUrl, animate, index } = props;
    return (
        <motion.div 
            className="flex flex-col items-center cursor-pointer"
            whileHover={{ y: -8 }}
            initial={animate ? { y: 10, opacity: 0 } : {}}
            animate={animate ? { y: 0, opacity: 1 } : {}}
            exit={animate ? { y: 10, opacity: 0 } : {}}
            transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
        >
            <motion.div 
                className="bg-neutral-200 rounded-2xl overflow-hidden w-full aspect-[3/4] mb-4"
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <motion.div
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <ImageWithFallback
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover hover:grayscale-100 transition-all duration-400"
                    />
                </motion.div>
            </motion.div>
            <motion.h3 
                className="text-white text-center"
            >
                {name}
            </motion.h3>
            <p className="text-neutral-400 text-sm text-center">{role}</p>
        </motion.div>
    );
}
