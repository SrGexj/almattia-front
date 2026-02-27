import { Link } from "react-router-dom"
import { usePageScroll } from "../contexts/PageScrollContext"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { MobileMenu } from "./MobileMenu"
import { Instagram } from "lucide-react"

export const Header = ({ id }) => {

    const menuItems = [
        { name: 'Nuestro equipo', link: '/nuestro-equipo' },
        { name: 'Eventos', link: '/eventos' },
        { name: 'Formacion', link: '/formacion' },
        { name: 'Otros Servicios', link: '/otros-servicios' },
    ]

    const isMobile = window.innerWidth < 768

    const { currentPage } = usePageScroll()

        const [navItemSize, setNavItemSize] = useState({
        width: 35,
        height: 30,
        left: 0,
        top: 0,
        opacity: 0,
    })
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleMoveIndicator = (e) => {
        const target = e.target.closest('li')
        if (!target) return

        const rect = target.getBoundingClientRect()
        const parentRect = target.parentNode.getBoundingClientRect()
        const padding = 20
        
        setNavItemSize({
          width: rect.width + padding,
          height: 30,
          left: rect.left - parentRect.left - (padding / 2),
          top: rect.top - parentRect.top,
          opacity: 1,
        })
    }
      
    const handleMouseLeave = () => {
        setNavItemSize((prevSize) => ({
          width: prevSize.width,
          height: 30,
          left: prevSize.left,
          top: 0,
          opacity: 0,
        }))
    }

    const toggleMenu = () => {
        setIsMobileMenuOpen((prev) => !prev)
    }

    useEffect(() => {

    }, [navItemSize])

    useEffect(() => {
        // si isMobile es true, bloqueamos el scroll
        if (isMobileMenuOpen) {
            document.documentElement.style.overflow = 'hidden !important'
            document.body.style.overflow = 'hidden !important'
        } else {
            document.documentElement.style.overflow = 'auto !important'
            document.body.style.overflow = 'auto !important'
        }
    }, [isMobileMenuOpen])
    return (
        <motion.header id={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`w-full h-fit p-5 top-0 text-white transition-all duration-300 flex items-center fixed ${currentPage !== 'home' ? 'justify-between p-3 pl-15 pr-5 max-[1025px]:left-0 max-[768px]:pl-5' : 'justify-between'} z-10 transition-all duration-500 ${currentPage === 'eventos' ? 'bg-[#7d8570]' : currentPage === 'formacion' ? 'bg-[#353f4f]' : currentPage === 'otros-servicios' ? ''  : ''}`}>
            <Link to={"/"} className={`w-30 transition-all duration-300 flex items-center justify-center max-[1025px]:!ml-0 ${currentPage !== 'home' ? 'ml-4' : 'w-full'}`}>
                <motion.svg initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{'fill': 'white'}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 268.3 100.6" xmlSpace="preserve" width="150px" height="56px">
                    <path className="st0" d="M33.1,33.9v34h-3L23,60.7c0,7.2-3.7,7.2-3.7,7.2h-5c0,0-13.8,0-13.8-13.7s13.8-13.7,13.8-13.7h11.5v-6.5
                        c0-6.4-6.5-6.4-6.5-6.4H3.7v-7.2h15.6C19.3,20.2,33.1,20.2,33.1,33.9z M25.8,47.7H14.3c0,0-6.5,0-6.5,6.4s6.5,6.5,6.5,6.5h5
                        c0,0,6.5,0,6.5-6.5L25.8,47.7z"/>
                    <path className="st0" d="M56.9,60.7v7.2H39.6v-7.2h5.1V0H52v60.7H56.9z"/>
                    <path className="st0" d="M110,33.9v34h-7.2v-34c0,0,0-6.4-6.4-6.4s-6.5,6.4-6.5,6.4v34h-7.3v-34c0-6.4-6.4-6.4-6.4-6.4
                        c-6.6,0-6.6,6.4-6.6,6.4v34h-7.2V20.2h2.9l7.2,7.1c0-7.1,3.6-7.1,3.6-7.1c4.3-0.2,8.3,2.4,10,6.4c0,0,4.1-6.4,10.2-6.4
                        C110,20.2,110,33.9,110,33.9z"/>
                    <path className="st0" d="M148.9,33.9v34h-3l-7.1-7.2c0,7.2-3.7,7.2-3.7,7.2h-5c0,0-13.8,0-13.8-13.7s13.8-13.7,13.8-13.7h11.5v-6.6
                        c0-6.4-6.5-6.4-6.5-6.4h-15.7v-7.2h15.7C135.1,20.2,148.9,20.2,148.9,33.9z M141.6,47.7h-11.5c0,0-6.5,0-6.5,6.4s6.5,6.5,6.5,6.5h5
                        c0,0,6.5,0,6.5-6.5L141.6,47.7z"/>
                    <path className="st0" d="M166.5,27.4v26.7c0,0,0,6.5,6.6,6.5h3.5v7.2h-3.5c0,0-13.8,0-13.8-13.7V27.4h-5v-1.2
                        c3.9-5.5,7.4-10.6,11.2-16.1h0.9v10.1h10.1v7.2H166.5z"/>
                    <path className="st0" d="M193.6,61V34.2c0,0,0-6.5-6.6-6.5h-3.5v-7.2h3.6c0,0,13.8,0,13.8,13.7V61h5v1.2c-3.9,5.5-7.4,10.6-11.2,16.1
                        h-0.9V68.1h-10.2V61H193.6z"/>
                    <path className="st0" d="M229.4,60.7v7.2h-17.3v-7.2h5.1V20.2h7.3v40.4H229.4z M224.4,7.3h-7.3V0h7.3V7.3z"/>
                    <path className="st0" d="M267.7,33.9v34h-3l-7.1-7.2c0,7.2-3.7,7.2-3.7,7.2h-5c0,0-13.8,0-13.8-13.7S249,40.4,249,40.4h11.5v-6.5
                        c0-6.4-6.5-6.4-6.5-6.4h-15.7v-7.2h15.6C253.9,20.2,267.7,20.2,267.7,33.9z M260.5,47.7H249c0,0-6.5,0-6.5,6.4s6.5,6.5,6.5,6.5h5
                        c0,0,6.5,0,6.5-6.5L260.5,47.7z"/>
                    <path className="st0" d="M4.9,94.9c1.5,0.8,2,2.6,1.2,4.1c-0.5,1-1.6,1.6-2.7,1.6H0V89.9h3.1c1.5,0,2.8,1.2,2.9,2.7
                        C6,93.5,5.6,94.3,4.9,94.9L4.9,94.9z M1.2,91.1v3.4h1.9c0.9,0,1.7-0.8,1.7-1.7c0-0.9-0.8-1.7-1.7-1.7H1.2z M5.2,97.5
                        c0-1-0.8-1.8-1.8-1.8H1.2v3.6h2.1C4.4,99.3,5.2,98.5,5.2,97.5C5.2,97.5,5.2,97.5,5.2,97.5z"/>
                    <path className="st0" d="M14.6,89.9v7.5c0,1.7-1.3,3.2-3,3.2c0,0-0.1,0-0.1,0c-1.7,0-3.2-1.3-3.2-3.1c0,0,0-0.1,0-0.1v-7.5h1.2v7.5
                        c-0.2,1.1,0.5,2.1,1.5,2.4s2.1-0.5,2.4-1.5c0.1-0.3,0.1-0.6,0-0.8v-7.5H14.6z"/>
                    <path className="st0" d="M22.6,97.9c0,1.7-1.4,2.7-3.2,2.7H17v-1.2h2.3c0,0,1.8,0,1.8-1.5c0-1.8-5-2.8-5-5.3c0-1.7,1.4-2.7,3.2-2.7h2.3
                        v1.2h-2.3c0,0-1.8,0-1.8,1.5C17.6,94.3,22.6,95.5,22.6,97.9z"/>
                    <path className="st0" d="M24.4,100.6V89.9h1.2v10.7H24.4z"/>
                    <path className="st0" d="M34.4,89.9v10.7h-1.3l-3.8-8.2v8.2H28V89.9h1.3l3.8,8.1v-8.1H34.4z"/>
                    <path className="st0" d="M42.4,89.9v1.2H38v3.1h3.4v1.2H38v3.9h4.3v1.2h-5.5V89.9H42.4z"/>
                    <path className="st0" d="M50,97.9c0,1.7-1.4,2.7-3.2,2.7h-2.3v-1.2h2.3c0,0,1.8,0,1.8-1.5c0-1.8-5-2.8-5-5.3c0-1.7,1.4-2.7,3.2-2.7h2.3
                        v1.2h-2.3c0,0-1.8,0-1.8,1.5C45,94.3,50,95.5,50,97.9z"/>
                    <path className="st0" d="M57.5,97.9c0,1.7-1.4,2.7-3.2,2.7H52v-1.2h2.3c0,0,1.8,0,1.8-1.5c0-1.8-5-2.8-5-5.3c0-1.7,1.4-2.7,3.2-2.7h2.3
                        v1.2h-2.3c0,0-1.8,0-1.8,1.5C52.5,94.3,57.5,95.5,57.5,97.9z"/>
                    <path className="st0" d="M69.2,89.9v1.2h-2.6v9.4h-1.2v-9.4h-2.6v-1.2H69.2z"/>
                    <path className="st0" d="M74.1,96.2c0.7,1.2,1.7,3.1,2.4,4.4h-1.4l-2.4-4.3h-1.2v4.3h-1.2V89.9h3.2c1.8,0,3.2,1.4,3.2,3.1
                        C76.7,94.6,75.6,95.9,74.1,96.2z M71.5,95.1h2.1c1,0,1.9-0.9,1.9-1.9c0,0,0,0,0-0.1c0-1.1-0.8-2-1.8-2c-0.1,0-0.1,0-0.2,0h-2
                        L71.5,95.1z"/>
                    <path className="st0" d="M84.6,100.6h-1.2l-0.5-1.7h-3.9l-0.4,1.7h-1.2l2.8-10.7h1.6L84.6,100.6z M82.6,97.6L81,91.2h-0.2l-1.5,6.4H82.6
                        z"/>
                    <path className="st0" d="M85.7,100.6V89.9H87v10.7H85.7z"/>
                    <path className="st0" d="M95.8,89.9v10.7h-1.3l-3.8-8.2v8.2h-1.2V89.9h1.3l3.8,8.1v-8.1H95.8z"/>
                    <path className="st0" d="M98.2,100.6V89.9h1.2v10.7H98.2z"/>
                    <path className="st0" d="M108.2,89.9v10.7h-1.3l-3.9-8.2v8.2h-1.2V89.9h1.3l3.9,8.1v-8.1H108.2z"/>
                    <path className="st0" d="M113.5,100.6c-1.7,0-3.2-1.3-3.2-3c0,0,0-0.1,0-0.1v-4.3c0-1.7,1.3-3.1,3.1-3.2c0,0,0.1,0,0.1,0
                        c1.7-0.1,3.1,1.2,3.2,2.8c0,0.1,0,0.1,0,0.2h-1.2c0-1-0.8-1.8-1.8-1.7c0,0-0.1,0-0.1,0c-1.1,0-1.9,0.8-2,1.9c0,0,0,0.1,0,0.1v4.3
                        c0,1.1,0.8,2,1.8,2c0,0,0.1,0,0.1,0c1,0.1,1.9-0.7,2-1.7c0-0.1,0-0.2,0-0.3v-1.2h-1.7V95h3v5.5h-0.5l-1-1.3
                        C115,100,114.3,100.5,113.5,100.6z"/>
                    <path className="st0" d="M131.4,94.6v1.2h-1.7v4.7h-3.2c-1.7,0.1-3.1-1.2-3.1-2.9c0-1,0.4-1.9,1.1-2.5c-1.3-1-1.5-2.9-0.5-4.2
                        c0.6-0.7,1.5-1.2,2.5-1.1h2.3v1.2h-2.3c-0.3,0-2,0.1-2,1.8s1.7,1.8,2,1.8H131.4z M128.5,95.8h-2c-0.3,0-2,0.1-2,1.8s1.7,1.7,2,1.7h2
                        V95.8z"/>
                    <path className="st0" d="M143,89.9v1.2h-4.3v3.1h3.4v1.2h-3.4v3.9h4.3v1.2h-5.5V89.9H143z"/>
                    <path className="st0" d="M151.1,89.9l-3.3,10.7h-0.9l-3.3-10.7h1.3l2.5,8.3l2.4-8.3H151.1z"/>
                    <path className="st0" d="M157.8,89.9v1.2h-4.3v3.1h3.4v1.2h-3.4v3.9h4.3v1.2h-5.5V89.9H157.8z"/>
                    <path className="st0" d="M166,89.9v10.7h-1.3l-3.8-8.2v8.2h-1.2V89.9h1.3l3.8,8.1v-8.1H166z"/>
                    <path className="st0" d="M173.6,89.9v1.2H171v9.4h-1.2v-9.4h-2.6v-1.2H173.6z"/>
                    <path className="st0" d="M180.5,97.9c0,1.7-1.4,2.7-3.2,2.7H175v-1.2h2.3c0,0,1.8,0,1.8-1.5c0-1.8-5-2.8-5-5.3c0-1.7,1.4-2.7,3.2-2.7
                        h2.3v1.2h-2.3c0,0-1.8,0-1.8,1.5C175.5,94.3,180.5,95.5,180.5,97.9z"/>
                    <path className="st0" d="M195.1,89.9v10.7h-1.2V92c-1.2,2-2,3.5-2.8,4.9l-2.8-4.9v8.6H187V89.9h1.3l2.7,4.5c0.8-1.3,1.9-3.2,2.7-4.5
                        L195.1,89.9z"/>
                    <path className="st0" d="M203.5,100.6h-1.2l-0.5-1.7h-3.9l-0.5,1.7h-1.2l2.8-10.7h1.6L203.5,100.6z M201.5,97.6l-1.5-6.4h-0.2l-1.5,6.4
                        H201.5z"/>
                    <path className="st0" d="M211.1,89.9v10.7h-1.3l-3.8-8.2v8.2h-1.2V89.9h1.3l3.8,8.1v-8.1H211.1z"/>
                    <path className="st0" d="M219.6,100.6h-1.2l-0.5-1.7h-3.9l-0.4,1.7h-1.2l2.8-10.7h1.6L219.6,100.6z M217.5,97.6l-1.5-6.4h-0.2l-1.5,6.4
                        H217.5z"/>
                    <path className="st0" d="M223.6,100.6c-1.7,0-3.2-1.3-3.2-3.1c0,0,0-0.1,0-0.1v-4.3c0-1.7,1.3-3.1,3.1-3.2c0,0,0.1,0,0.1,0
                        c1.7-0.1,3.1,1.2,3.2,2.8c0,0.1,0,0.1,0,0.2h-1.2c0-1-0.8-1.8-1.8-1.7c0,0-0.1,0-0.1,0c-1.1,0-2,0.8-2,1.8c0,0.1,0,0.1,0,0.2v4.3
                        c0,1.1,0.8,2,1.8,2c0.1,0,0.1,0,0.2,0c1,0,1.9-0.8,2-1.8c0-0.1,0-0.1,0-0.2v-1.2h-1.7V95h2.9v5.5h-0.5l-1-1.3
                        C225.1,99.5,224.7,100.6,223.6,100.6z"/>
                    <path className="st0" d="M234.6,89.9v1.2h-4.3v3.1h3.4v1.2h-3.4v3.9h4.3v1.2h-5.5V89.9H234.6z"/>
                    <path className="st0" d="M244.6,89.9v10.7h-1.2V92c-1.2,2-2,3.5-2.8,4.9l-2.8-4.9v8.6h-1.2V89.9h1.3l2.7,4.5c0.8-1.3,1.9-3.2,2.7-4.5
                        H244.6z"/>
                    <path className="st0" d="M252.5,89.9v1.2h-4.3v3.1h3.4v1.2h-3.4v3.9h4.3v1.2H247V89.9H252.5z"/>
                    <path className="st0" d="M260.8,89.9v10.7h-1.3l-3.8-8.2v8.2h-1.2V89.9h1.3l3.8,8.1v-8.1H260.8z"/>
                    <path className="st0" d="M268.3,89.9v1.2h-2.6v9.4h-1.2v-9.4h-2.6v-1.2H268.3z"/>
                </motion.svg>
            </Link>
            { currentPage !== 'home' && !isMobile ?
                (
                    <div className={`flex items-center gap-15 transition-all duration-300 ${currentPage !== 'home' ? 'opacity-100 visible pointer-events-auto w-fit max-[768px]:hidden' : 'opacity-0 invisible pointer-events-none w-0'} `}>
                        <ul className="list-none flex gap-7" onMouseLeave={handleMouseLeave} style={{position: 'relative'}}>
                            {menuItems.map((item, index) => (
                                <motion.li 
                                    initial={{ opacity: 0, y: -10 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    exit={{ opacity: 0, y: -10 }} 
                                    transition={{ delay: 0.1 * index }}
                                    key={index} 
                                    className="z-1"
                                    onMouseMove={handleMoveIndicator}
                                >
                                    <Link to={item.link}>{item.name}</Link>
                                </motion.li>
                            ))}
                            <span className={`hover-indicator absolute bg-[#fbfbfb50] top-[50%] p-4 px-4 -translate-y-1/2 rounded-2xl transition-all duration-300`} style={{width: navItemSize.width, height: navItemSize.height, left: navItemSize.left, opacity: navItemSize.opacity, padding: '0 10px'}}></span>
                        </ul>
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: 0.1 * menuItems.length }}
                        >
                            <Link to="/contacto" className="bg-[#e8e1d9] text-[#2c2c2c] px-4 py-1 font-normal rounded-2xl hover:bg-[#2c2c2c] hover:text-[#e8e1d9] transition duration-300">Contacto</Link>
                        </motion.span>
                    </div> 
            ) : currentPage !== 'home' ? (
                <>
                    <div className="w-10 h-10 flex flex-col justify-center items-center gap-2 mr-2 cursor-pointer z-9" onClick={toggleMenu}>
                        <span className={`w-full h-[2px] bg-white rounded-full transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                        <span className={`w-full h-[2px] bg-white rounded-full transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                        <span className={`w-full h-[2px] bg-white rounded-full transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    </div>
                    <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} menuItems={menuItems} />
                </>
            ) : null
    }
        </motion.header>
    )
}