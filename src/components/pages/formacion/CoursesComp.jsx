import { useEffect, useState } from "react"
import { CalendarComponent } from "./CalendarComponent"
import { CourseCard } from "./CourseCard"
import { motion } from "framer-motion"
import { AnimatedCoursesContainer } from "./AnimatedCoursesCointainer"

export const CoursesComp = ({ apiUrl, apiToken }) => { 

    const [courses, setCourses] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [coursesForSelectedDate, setCoursesForSelectedDate] = useState([])
    
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const handleDateSelect = (date) => {
        if (date === selectedDate) {
            setSelectedDate(null)
            return
        }    
        setSelectedDate(date)
    }

    const getEventsForDay = (selectedDate) => {
        const selectedCourses = courses.filter(e => {
        const [dayE, monthE, yearE] = e.start_date.split("/");
        const fecha = new Date(+yearE, +monthE - 1, +dayE);
        return fecha.toDateString() === selectedDate.toDateString();
        })
        setCoursesForSelectedDate(selectedCourses)
    }

    const fetchEvents = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        }
      }

      try {
          const response = await fetch(`${apiUrl}/courses/es`, options)
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          setCourses(data.data)

/* 
          data.data.forEach(element => {
              element.categories.forEach(cat => {
                  const name = typeof cat === 'string' ? cat : cat.name
                  const slug = typeof cat === 'string' ? undefined : cat.slug
                  const color = typeof cat === 'string' ? getRandomColor() : (cat.color || getRandomColor())

                  setCategories(prev => {
                    if (prev.some(c => c.name === name)) return prev
                    return [...prev, { name, slug, color }]
                  })
              })
          }) */
      } catch (error) {
          console.error('Error fetching courses:', error)
      }
    }
    
    useEffect(() => {
      fetchEvents()
    }, [apiUrl, apiToken])


    return (
        <div className="grid grid-cols-3 max-[1025px]:grid-cols-1 w-full">
            {
                courses.length > 0 ? courses.map( (course, index) => {
                    return <CourseCard key={index} index={index} course={course} />
                }) : (
                    <p>No hay cursos disponibles.</p>
                )
            }
           {/*  <div className="w-full flex items-start justify-start max-[1025px]:order-2">
                <AnimatedCoursesContainer selectedDate={selectedDate} courses={courses} coursesForSelectedDate={coursesForSelectedDate} />
            </div> */}
        {/*     <div id="coursesGrid" className="w-full flex items-start justify-end max-[1025px]:!order-1">
                <CalendarComponent courses={courses} categories={categories} onDateSelect={handleDateSelect} />
            </div> */}
           
        </div>
    )
}