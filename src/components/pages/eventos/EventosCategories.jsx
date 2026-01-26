import { useEffect, useState } from "react"
import { CategoriesCard } from "../../CategoriesCard"

export const EventosCategories = ({onClick, selectedCategory}) => {

    const BPANEL_API = import.meta.env.VITE_BPANEL_API
    const token = import.meta.env.VITE_BPANEL_TOKEN

    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const response = await fetch(`${BPANEL_API}/events-categories/es`, options)

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
                 
            const data = await response.json()
            setCategories(data)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const onClickHandler = (category) => {
        if (onClick) {
            onClick(category)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (

        <>
            {
                categories.length > 0 ? (
                    categories.map((category, index) => (
                        <CategoriesCard 
                            key={index} 
                            category={category}
                            onClick={() => onClickHandler(category)}
                            isSelected={selectedCategory && selectedCategory.slug === category.slug}
                            index={index}
                        />
                    ))
                ) : (
                    <p className="text-[#959595] font-dm font-light text-center text-xl">
                        No se han encontrado categorías..
                    </p>
                )
            }
        </>

    )


}