import { FacilitiesSlider } from "../components/FacilitiesSlider";
import { TeamMember } from "../components/TeamMember";

export const NuestroEquipo = () => {

const teamMembers = [
    {
      name: "Pilar Costado",
      role: "Directora Gerente",
      imageUrl: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5NzEzMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Laura Gómez",
      role: "Formación y administración",
      imageUrl: "https://images.unsplash.com/photo-1590650467980-8eadfa86ff48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwb2ZmaWNlfGVufDF8fHx8MTc1OTc0MzQzMXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Cristina Aretio",
      role: "Comunicación, protocolo y RRIII",
      imageUrl: "https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5ODMzMjkyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Cristina Villalobos",
      role: "Eventos y protocolo",
      imageUrl: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5NzEzMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

    return (
    <>
      <section id="equipo" className="pt-30 py-16 bg-neutral-800 min-[1921px]:px-100 max-[1280px]:px-50 max-[1024px]:px-20 px-45">
        <div className="mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-white text-4xl mb-4">Conoce al equipo</h1>
            <p className="text-neutral-400 italic mb-4">
              "Detrás de cada decisión difícil se esconde una gran oportunidad.<br />
              En nuestras manos está aprovecharla"
            </p>
            <p className="text-neutral-400 text-sm max-w-3xl mx-auto">
              Fue lo que la Madre Damiana le dijo a Pilar cuando con tan solo 14 años se disponía a tomar una de sus 
              primeras decisiones difíciles. Una figura que sin duda, la ha inspirado en muchos momentos de su vida, y a 
              quien Almatbia debe de hombros por haber hecho y toma en la toma las nuevas oportunidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-[0px]">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
                animate={true}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Instalaciones Section */}
      <section className="py-16 bg-neutral-800 min-[1921px]:px-75 max-[1280px]:px-50 max-[1024px]:px-20 px-30">
        <div className="mx-auto">
          <FacilitiesSlider />
          
        </div>
      </section>
    </>
    );
}