import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function EncryptedText({ text = 'Jose Bernard Fernandez', speed = 50 }) {
  const [displayText, setDisplayText] = useState('')
  const [isDecrypted, setIsDecrypted] = useState(false)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

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
    <motion.span
      className="font-code text-accent-teal cursor-pointer hover:text-accent-amber transition-colors"
      onClick={() => setIsDecrypted(!isDecrypted)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  )
}

export default EncryptedText
