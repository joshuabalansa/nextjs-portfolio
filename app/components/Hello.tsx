import React, { useState } from 'react'
import { useTrail, a } from '@react-spring/web'

const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className="relative w-full h-20 text-black dark:text-gray-300 text-4xl sm:text-6xl font-extrabold tracking-tight overflow-hidden" style={style}>
          <a.div className="overflow-hidden" style={{ height }}>
            {items[index]}
          </a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function App() {
  const [open, set] = useState(true)

  return (
    <div className="flex items-center justify-center px-5 sm:px-10 md:px-20 " onClick={() => set(state => !state)}>
      <div className="text-center w-full max-w-3xl mx-auto">
        {/* Text Animation for title */}
        <Trail open={open}>
          <span>Hello, World!</span>
          <span>I'm Joshua!</span>
          <span>Full Stack Dev</span>
        </Trail>

        {/* Paragraph outside the animation */}
        <p className="text-sm sm:text-base md:text-lg py-6 leading-6 md:leading-8 mx-auto text-gray-700 dark:text-gray-300 max-w-full sm:max-w-xl">
          👋✨ Hello, World! I'm Joshua! a passionate software developer 💻 with a strong focus on continuous learning.📚 Currently, I’m deepening my expertise in PHP 🐘, Laravel ⚡ and React ⚛️ to tackle exciting challenges and expand my skills in software development.
        </p>
      </div>
    </div>
  )
}
