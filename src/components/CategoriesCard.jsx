import DOMPurify from 'dompurify'
import { 
    Target,
    Users,
    Award,
    Sparkles,
    Clapperboard
} from 'lucide-react'

// Array de iconos para asignar por índice
const icons = [Target, Users, Award, Sparkles, Clapperboard]

export const CategoriesCard = ({ category, onClick, isSelected, index }) => {
    // Obtener el icono por índice, si hay más categorías que iconos, se repite el ciclo
    const IconComponent = icons[index % icons.length]

    return (
        <div  
            className={`relative p-[15px] gap-4 flex flex-col rounded-[30px] overflow-hidden bg-[#343632]/90 border-2 border-[#7d8570] hover:bg-[#50544d] group transition-all duration-300 ${isSelected ? 'bg-[#98a08b37]' : ''}`} 
            onClick={() => {
                onClick(category) 
            }}
        >
            <span className="w-[50px] h-[50px] bg-[#7d8570] rounded-xl group-hover:bg-white flex items-center justify-center duration-300">
                <IconComponent 
                    className="text-white group-hover:text-[#7d8570] transition-colors duration-300" 
                    size={28}
                    strokeWidth={1}
                />
            </span>
            <h3 className="text-white text-[20px] font-medium">{category.title}</h3>
            <p className="text-[16px] text-[#a2a39f] group-hover:text-white duration-300 font-light"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(category.text) }}
            />
        </div>
    )
}