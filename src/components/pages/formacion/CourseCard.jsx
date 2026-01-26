import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

export const CourseCard = ({ course, index }) => {
    const { title, subtitle, start_date, categories, day, month, time_string, day_string, images } = course;

    return (
        <motion.div
            className="group relative rounded-3xl h-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
            {/* Borde animado en hover - DEBAJO DE TODO */}
            <div className="absolute inset-[10px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                <div
                    className="border-anim-course absolute inset-0 rounded-3xl"
                    style={{
                        '--course-color': categories?.[0]?.color || '#4e5c72'
                    }}
                />
            </div>

            {/* Contenedor interno con padding */}
            <div className="inset-0 p-3 z-10">
                {/* Contenedor de la tarjeta con overflow hidden */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#303132] flex flex-col">
                    <div className="absolute inset-0 opacity-20"
                         style={{
                            background: `linear-gradient(135deg, ${categories?.[0]?.color || '#4e5c72'} 0%, transparent 100%)`
                         }}
                    />
                    {/* Fecha y categoría sobre la imagen */}
                    <div className="inset-0 z-10 p-3 flex items-start justify-between">
                        <span
                            className="flex flex-col p-2 px-3 border-1 bg-[#1f1e22d2]/80 text-white justify-center items-center rounded-xl backdrop-blur-[1px] max-[768px]:p-1.5 max-[768px]:px-2"
                            style={{ borderColor: categories?.[0]?.color || '#4e5c72' }}
                        >
                            <p className="!text-[35px] leading-[1] max-[768px]:!text-[28px]">{day}</p>
                            <p className="!text-[18px] leading-[1] max-[768px]:!text-[15px]">{month}</p>
                        </span>

                        {/* Categoría */}
                        {categories?.[0] && (
                            <span
                                className="text-[#f3f5f0] border-1 backdrop-blur-[1px] rounded-xl px-3 py-1 text-[14px] max-[768px]:text-[12px] max-[768px]:px-2 max-[768px]:py-0.5"
                                style={{
                                    backgroundColor: `${categories[0].color}40`,
                                    borderColor: categories[0].color
                                }}
                            >
                                {categories[0].name}
                            </span>
                        )}
                    </div>
                    {/* Sección inferior con información del curso */}
                    <div className="relative flex-1 p-3 flex flex-col justify-end gap-3">
                        {/* Horario */}
                        <div className="flex flex-col gap-2 text-[#a2a39f] text-[14px] max-[768px]:text-[13px]">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} strokeWidth={1.5} />
                                <span>{day_string}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} strokeWidth={1.5} />
                                <span>{time_string}</span>
                            </div>
                        </div>

                        {/* Título y subtítulo */}
                        <div className="w-full flex flex-col gap-1 px-4 py-3 border-1 rounded-2xl bg-[#2C2C2C]/75 backdrop-blur-[3px] max-[768px]:px-3 max-[768px]:py-2"
                            style={{ borderColor: categories?.[0]?.color || '#4e5c72' }}
                        >
                            <h3 className="text-white text-[20px] leading-[1.2em] font-light max-[768px]:text-[18px]">
                                {title}
                            </h3>
                            <p className="text-[#a2a39f] text-[14px] leading-[1.3em] font-light max-[768px]:text-[13px]">
                                {subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}