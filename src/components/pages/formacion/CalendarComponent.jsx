import { useEffect, useState } from "react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"
import "react-day-picker/style.css"
import { CustomDay } from "../../helpers/CustomDay"
import { es } from "react-day-picker/locale"

export const CalendarComponent = ({courses, categories, onDateSelect}) => {

  const defaultClassNames = getDefaultClassNames()

  const mobileBreakpoint = 1024 // px
  
  function handleDayClick (day) {
      const dia = String(day.getDate()).padStart(2, '0')
      const mes = String(day.getMonth() + 1).padStart(2, '0')
      const anio = day.getFullYear()
      const fechaFormateada = `${dia}/${mes}/${anio}`
      onDateSelect(fechaFormateada)

      // navegar al id #coursesGrid en movil y tablets
      if (window.innerWidth > mobileBreakpoint) return;
      const element = document.getElementById("coursesGrid");
      if (element) {
          element.scrollIntoView({ behavior: "smooth" });
      }
  }
  
  return (
      <DayPicker
        components={{
          DayButton: (props) => <CustomDay courses={courses} categories={categories} handleDayClick={handleDayClick} {...props} />
        }}
        onDayClick={{}}
        className={"text-[26px] font-light w-fit bg-[#24272d] border-2 border-[#353f4f] rounded-[20px] p-5 text-white"}
        classNames={{
            chevron: `fill-white`
        }}
        locale={es}
      />
  )
}