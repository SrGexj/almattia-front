export const NotFound = () => {
    return (
        <section className="w-full h-screen flex flex-col justify-center items-center font-dm text-center text-white gap-5 pr-10">
            <h1 className="text-6xl font-light">404</h1>
            <h2 className="text-2xl font-light">Página no encontrada</h2>
            <p className="text-lg max-w-lg">Lo sentimos, la página que estás buscando no existe. Por favor, verifica la URL o regresa a la página principal.</p>
        </section>
    )
}