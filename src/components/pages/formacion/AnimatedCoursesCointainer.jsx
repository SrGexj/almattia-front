import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { CourseCard } from "./CourseCard"

export const AnimatedCoursesContainer = ({ selectedDate, courses, coursesForSelectedDate }) => {
    const [height, setHeight] = useState(0)
    let scrollHeight = 0
    const contentRef = useRef(null)
    const extraSpace = 15 // px (2rem aprox)
  

    useEffect(() => {
        scrollHeight = contentRef.current ? contentRef.current.scrollHeight : 0

        if (contentRef.current) {
        // 👇 Añadimos un pequeño "espacio" adicional al final
        const newHeight = Math.min(scrollHeight + extraSpace, 600)
        setHeight(newHeight)
        }
    }, [selectedDate, courses, coursesForSelectedDate, extraSpace, scrollHeight])

    return (
        <motion.div
        animate={{ height }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="coursesContainer w-full p-4 rounded-[30px]"
        style={{ maxHeight: 600 }}
        >
        <div ref={contentRef} className="gap-3">
            {selectedDate ? (
            coursesForSelectedDate.length > 0 ? (
                coursesForSelectedDate.map((course, index) => (
                <CourseCard key={index} index={index} course={course} />
                ))
            ) : (
                <motion.p
                className="text-white text-[20px] pb-[15px] leading-[1rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                No hay cursos para la fecha seleccionada.
                </motion.p>
            )
            ) : courses.length > 0 ? (
            courses.map((course, index) => (
                <CourseCard key={index} index={index} course={course} />
            ))
            ) : (
            <motion.p
                className="text-white text-[20px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                No hay cursos disponibles.
            </motion.p>
            )}
        </div>
        </motion.div>
    )
}