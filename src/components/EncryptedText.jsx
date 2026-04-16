import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function EncryptedText({ text = 'Jose Bernard Fernandez', speed = 50 }) {
  const [displayText, setDisplayText] = useState('')
  const [isDecrypted, setIsDecrypted] = useState(false)
  const spanRef = useRef(null)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

  useEffect(() => {
    if (spanRef.current) {
      gsap.fromTo(spanRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }
  }, [])

  useEffect(() => {
    if (isDecrypted) {
      setDisplayText(text)
      return
    }

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText((prevText) =>
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return char
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setIsDecrypted(true)
      }

      iteration += 1 / speed
    }, 30)

    return () => clearInterval(interval)
  }, [isDecrypted, text, speed])

  return (
    <span
      ref={spanRef}
      className="font-code text-accent-teal cursor-pointer hover:text-accent-amber transition-colors opacity-0"
      onClick={() => setIsDecrypted(!isDecrypted)}
    >
      {displayText}
    </span>
  )
}

export default EncryptedText
