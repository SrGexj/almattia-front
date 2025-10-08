import { useEffect } from "react";

export const Formacion = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
            <>
        <section className="w-full h-screen flex justify-center items-center bg-[#50723c] pr-10 max-[1024px]:pr-0">
            <h2 className="text-4xl font-bold text-white">Formacion Page</h2>
        </section>
               <section className="w-full h-screen flex justify-center items-center bg-[#50723c]">
            <h2 className="text-4xl font-bold text-white">Formacion Page</h2>
        </section>
        </>
    )
}