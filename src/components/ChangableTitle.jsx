import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function ChangableTitle({ titles, classes = '', time = 2000 }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false) // fade-out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length) // cambiar frase
        setVisible(true) // fade-in
      }, 600)
    }, time + titles[index].length * 60) // escritura + tiempo de espera

    return () => clearTimeout(timer)
  }, [index, titles, time])

  return (
    <h1 className={`text-5xl max-[1025px]:text-2xl w-full text-start ${classes}`}>
      <span
        className={`transition-opacity duration-700 ease-in-out ${
          visible ? 'opacity-100' : 'opacity-0'
        } inline-block`}
      >
        <TypeAnimation
          key={index}
          sequence={[titles[index]]}
          speed={80}
          cursor={false} // quitamos cursor de la lib
          wrapper="span"
          repeat={0}
        />
        {/* Cursor fijo al final del texto */}
        <span className="animate-[blink_1s_step-start_infinite]">|</span>
      </span>

      <style>{`
        @keyframes blink {
          50% { opacity: 0 }
        }
      `}</style>
    </h1>
  )
}
