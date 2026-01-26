import { useEffect, useState } from "react"
import { InfoCard } from "../../ui/InfoCard"

export const ModalitiesComp = ({ apiToken, apiUrl }) => {

     const [modalities, setModalities] = useState([])

    const fetchModalities = async () => {
        
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            }
        }
        try {
            const response = await fetch(`${apiUrl}/modalities/es`, options)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const data = await response.json()
            setModalities(data.data)

        } catch (error) {
            console.error('Error fetching modalities:', error)
        }
    }

    useEffect(() => {
        fetchModalities()
    }, []);

    return (
        <div className="grid grid-cols-3 max-[1025px]:grid-cols-2 max-[768px]:grid-cols-1 gap-10 max-[768px]:gap-5">           
            {
                modalities.length > 0 ? (
                    modalities.map((modality, index) => (
                        <InfoCard
                            key={index}
                            index={index}
                            title={modality.title}
                            description={modality.description}
                            icon={modality.images.icon.url}
                        />
                    ))
                ) : (
                    modalities.map((modality, index) => (
                        <Skeleton
                            key={index}
                            isFor="infoCard"
                        />
                    ))
                )
            }
        </div>
    )
}