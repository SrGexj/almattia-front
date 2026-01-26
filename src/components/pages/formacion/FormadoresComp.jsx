import { useState, useEffect } from "react"
import { FormadoresCard } from "./FormadoresCard"
import { motion } from "framer-motion"

export const FormadoresComp = ({ apiUrl, apiToken }) => { 

    const [formers, setFormers] = useState([])

    const fetchFormers = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        }
      }

      try {
          const response = await fetch(`${apiUrl}/trainers/es`, options)
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          setFormers(data.data)
      } catch (error) {
          console.error('Error fetching formers:', error)
      }
    }

    useEffect(() => {
        fetchFormers()
    }, [])

    return (
        <>
            {formers.map((formador, index) => (
                <FormadoresCard index={index} key={index} formador={formador} />
            ))} 
        </>
    )
}