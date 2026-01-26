import { useContext, useEffect, useState } from "react";
import { FacilitiesSlider } from "../components/FacilitiesSlider";
import { TeamMember } from "../components/TeamMember";
import { PreLoader } from "../components/ui/PreLoader";
import { PreloaderContext } from "../contexts/PreloaderContext";

export const NuestroEquipo = () => {

  const {startLoading, stopLoading, updateProgress} = useContext(PreloaderContext);

  const  VITE_BPANEL_API  = import.meta.env.VITE_BPANEL_API;
  const VITE_BPANEL_TOKEN  = import.meta.env.VITE_BPANEL_TOKEN;

  const [teamMembers, setTeamMembers] = useState([]);

  const fetchTeamMembers = async () => {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${VITE_BPANEL_TOKEN}`
      }
    }

    try {
          // Inicio de la petición
          updateProgress(10)
          
          const response = await fetch(`${VITE_BPANEL_API}/team/es`, options);
          
          // Petición enviada
          updateProgress(30)
          
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Respuesta recibida
          updateProgress(60)
          
          const data = await response.json();
          
          // Datos parseados
          updateProgress(80)
          
          setTeamMembers(data.data)
          
          // Datos guardados
          updateProgress(90)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            stopLoading()
        }
  }

  useEffect(() => {
    fetchTeamMembers();
    document.title = "Almattia - Nuestro Equipo";
  }, []);

    return (
        <>
          <section id="equipo" className="pt-30 py-16 min-[1921px]:px-100 max-[1280px]:px-50 max-[1025px]:px-5 px-45">
            <div className="mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-white text-[50px] font-medium mb-4">Conoce al equipo</h1>
                <p className="text-neutral-300 text-[30px] italic mb-4 font-ogg!">
                  "Detrás de cada decisión difícil se esconde una gran oportunidad.<br />
                  En nuestras manos está aprovecharla"
                </p>
                <p className="text-neutral-400 text-[18px] max-w-4xl mx-auto">
                  Fue lo que la Madre Dalmatia le dijo a Pilar cuando con tan solo 14 años se disponía a tomar una de sus 
                  primeras decisiones difíciles. Una figura que sin duda, la ha inspirado en muchos momentos de su vida, y a 
                  quien Almattia debe de hombros por haber hecho y toma en la toma las nuevas oportunidades.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-[0px]">
                {teamMembers && teamMembers.map((member, index) => (
                  <TeamMember
                    key={index}
                    name={member.name}
                    role={member.job}
                    imageUrl={member.images.featured_image ? member.images.featured_image.url : ''}
                    animate={true}
                    index={index}
                  />
                ))} 
              </div>
            </div>
          </section>

          {/* Instalaciones Section */}
          <section className="py-16 min-[1921px]:px-100 max-[1280px]:px-50 max-[1025px]:px-5 max-[1025px]:pt-5 px-45 max-[1025px]:pb-25">
            <div className="mx-auto">
              <FacilitiesSlider />
            </div>
          </section>
        </>
  )}