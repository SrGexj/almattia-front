import { motion } from 'framer-motion';

export const AnimatedBackground = ({ opacity = 0.05, color = "#fff" }) => {

    return (
         <>
        <motion.div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ 
                opacity: opacity,
                zIndex: -1
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: opacity }}
            transition={{ duration: 2 }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 5760 3240"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <style>
                        {`.cls-1 { fill: none; stroke: url(#lightGradient); stroke-miterlimit: 10; stroke-width: 2; }
                          .cls-2 { fill: ${color}; }`}
                    </style>
                    
                    {/* Gradiente animado para simular luz que recorre */}
                    <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2">
                            <animate
                                attributeName="offset"
                                values="0;1;0"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="10%" stopColor={color} stopOpacity="0.8">
                            <animate
                                attributeName="offset"
                                values="0.1;1.1;0.1"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="20%" stopColor={color} stopOpacity="1">
                            <animate
                                attributeName="offset"
                                values="0.2;1.2;0.2"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="30%" stopColor={color} stopOpacity="0.8">
                            <animate
                                attributeName="offset"
                                values="0.3;1.3;0.3"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="40%" stopColor={color} stopOpacity="0.2">
                            <animate
                                attributeName="offset"
                                values="0.4;1.4;0.4"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </stop>
                    </linearGradient>
                    
                    {/* Segundo gradiente con delay diferente */}
                    <linearGradient id="lightGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2">
                            <animate
                                attributeName="offset"
                                values="0;1;0"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="10%" stopColor={color} stopOpacity="0.8">
                            <animate
                                attributeName="offset"
                                values="0.1;1.1;0.1"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="20%" stopColor={color} stopOpacity="1">
                            <animate
                                attributeName="offset"
                                values="0.2;1.2;0.2"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="30%" stopColor={color} stopOpacity="0.8">
                            <animate
                                attributeName="offset"
                                values="0.3;1.3;0.3"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="40%" stopColor={color} stopOpacity="0.2">
                            <animate
                                attributeName="offset"
                                values="0.4;1.4;0.4"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                        </stop>
                    </linearGradient>
                    
                    {/* Tercer gradiente */}
                    <linearGradient id="lightGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2">
                            <animate
                                attributeName="offset"
                                values="0;1;0"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="10%" stopColor={color} stopOpacity="0.8">
                            <animate
                                attributeName="offset"
                                values="0.1;1.1;0.1"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="20%" stopColor={color} stopOpacity="1">
                            <animate
                                attributeName="offset"
                                values="0.2;1.2;0.2"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="30%" stopColor={color} stopOpacity="0.8">
                            <animate
                                attributeName="offset"
                                values="0.3;1.3;0.3"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="40%" stopColor={color} stopOpacity="0.2">
                            <animate
                                attributeName="offset"
                                values="0.4;1.4;0.4"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </stop>
                    </linearGradient>
                </defs>
                
                {/* Repetir el patrón en grid 3x3 para más densidad y cobertura completa */}
                <g>
                    {/* Patrón original */}
                    <g>
                        <path
                            d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z"
                            style={{ stroke: 'url(#lightGradient)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99"
                            style={{ stroke: 'url(#lightGradient2)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95"
                            style={{ stroke: 'url(#lightGradient3)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M1275.36 220.03a4.994 4.994 0 0 0 4.99 4.94h.01v-4.94h-5.01Zm-.01-.06v.06h5.01v-5.06h-.01c-2.76 0-5 2.24-5 5m5.01 5c2.73 0 4.95-2.21 4.98-4.94h-4.98zm4.99-4.94v-.06a5 5 0 0 0-4.99-5v5.06h4.98Zm-644.92 4.99v-4.98h-4.96c0 2.74 2.22 4.96 4.96 4.98m0-10a5 5 0 0 0-4.96 5v.01h4.96zm0 10h.04a5 5 0 0 0 5-4.99h-5.04v4.98Zm5.04-4.99v-.01c0-2.76-2.24-5-5-5h-.04v5.01zm629.88 639.42c0 .18.03.34.05.51h4.96v-5.51h-.01c-2.76 0-5 2.24-5 5m.05.52a4.98 4.98 0 0 0 4.76 4.47v-4.47zm9.9 0c.02-.17.05-.34.05-.51a5 5 0 0 0-4.99-5v5.51zm-5.14 0v4.47c.07 0 .13.02.19.02 2.59 0 4.69-1.97 4.95-4.49zm-639.73 0v-5.46a5 5 0 0 0-4.96 5c0 .16.03.31.05.46zm-4.91 0a4.97 4.97 0 0 0 4.71 4.51v-4.51zm4.95-5.47h-.04v5.46h4.99c.01-.15.05-.3.05-.46 0-2.76-2.24-5-5-5"
                            className="cls-2"
                        />
                        <path
                            d="M640.23 859.97v4.51c.08 0 .16.02.24.02 2.6 0 4.72-2 4.95-4.54h-5.2Z"
                            className="cls-2"
                        />
                    </g>
                    
                    {/* Duplicar horizontalmente */}
                    <g transform="translate(1920, 0)">
                        <path
                            d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z"
                            style={{ stroke: 'url(#lightGradient)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99"
                            style={{ stroke: 'url(#lightGradient2)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95"
                            style={{ stroke: 'url(#lightGradient3)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                    </g>
                    
                    {/* Duplicar verticalmente */}
                    <g transform="translate(0, 1080)">
                        <path
                            d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z"
                            style={{ stroke: 'url(#lightGradient)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99"
                            style={{ stroke: 'url(#lightGradient2)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95"
                            style={{ stroke: 'url(#lightGradient3)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                    </g>
                    
                    {/* Duplicar en diagonal (horizontal + vertical) */}
                    <g transform="translate(1920, 1080)">
                        <path
                            d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z"
                            style={{ stroke: 'url(#lightGradient)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99"
                            style={{ stroke: 'url(#lightGradient2)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95"
                            style={{ stroke: 'url(#lightGradient3)' }}
                            fill="none"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                    </g>
                    
                    {/* Fila superior - izquierda */}
                    <g transform="translate(-1920, -1080)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    {/* Fila superior - centro */}
                    <g transform="translate(0, -1080)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    {/* Fila superior - derecha */}
                    <g transform="translate(1920, -1080)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    {/* Fila superior - más derecha */}
                    <g transform="translate(3840, -1080)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    {/* Fila centro - izquierda */}
                    <g transform="translate(-1920, 0)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    {/* Fila centro - más derecha */}
                    <g transform="translate(3840, 0)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    {/* Fila inferior - izquierda */}
                    <g transform="translate(-1920, 1080)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    {/* Fila inferior - más derecha */}
                    <g transform="translate(3840, 1080)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    {/* Fila más inferior - centro y laterales */}
                    <g transform="translate(0, 2160)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    <g transform="translate(1920, 2160)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                    
                    <g transform="translate(3840, 2160)">
                        <path d="M.5 859.97h635.02c-.01-.15-.05-.3-.05-.46 0-2.75 2.22-4.97 4.96-5V225.02a4.996 4.996 0 0 1-4.96-4.98H.5M640.23 1080V864.48a4.97 4.97 0 0 1-4.71-4.51H.29M.5 220.03h634.97v-.01c0-2.75 2.22-4.97 4.96-5V0m634.93 220.03H645.47a5 5 0 0 1-5 4.99h-.04v629.49h.04c2.76 0 5 2.24 5 5 0 .16-.03.31-.05.46h629.98c-.02-.17-.05-.34-.05-.51 0-2.76 2.24-5 5-5h.01V224.97h-.01c-2.74 0-4.96-2.21-4.99-4.94Z" style={{ stroke: 'url(#lightGradient)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1280.16 1080V864.43c-2.5-.1-4.5-2.02-4.76-4.47H645.42c-.24 2.54-2.35 4.54-4.95 4.54-.08 0-.16-.02-.24-.02V1080m.2-1080v215.02h.04c2.76 0 5 2.24 5 5v.01h629.89v-.06c0-2.76 2.24-5 5-5h.01V0m639.92 220.03h-634.95a5 5 0 0 1-4.98 4.94v629.49c2.76 0 4.99 2.24 4.99 5 0 .18-.03.34-.05.51h634.99" style={{ stroke: 'url(#lightGradient2)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M1920.09 859.97H1285.3c-.26 2.52-2.36 4.49-4.95 4.49-.07 0-.13-.02-.19-.02v215.57M1280.36 0v214.97c2.76 0 4.99 2.24 4.99 5v.06h634.95" style={{ stroke: 'url(#lightGradient3)' }} fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </g>
                </g>
            </svg>
        </motion.div>
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-65" style={{ zIndex: -2 }}>
                <div className="absolute -left-[200px] top-[400px] bg-[#7d8570] w-[600px] h-[600px] rounded-full blur-[200px] opacity-80 animate-pulse"></div>
                <div className="absolute -right-[200px] top-1/3 bg-[#7d8570] w-[600px] h-[600px] rounded-full blur-[200px] opacity-80 animate-pulse"></div>
                <div className="absolute left-1/4 bottom-1/4 bg-[#5a5e53] w-[550px] h-[550px] rounded-full blur-[180px] opacity-10 animate-pulse"></div>
                <div className="absolute right-1/3 top-2/3 bg-[#98a08b] w-[600px] h-[600px] rounded-full blur-[220px] opacity-40 animate-pulse"></div>
            </div>
        </>
    );
};
