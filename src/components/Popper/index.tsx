import React, { CSSProperties, useLayoutEffect, useRef, useState } from 'react'
import './index.css'

type Props = {
  children?: React.ReactNode
  title?: string
  content?: React.ReactNode | string
}

export default function Popper(props: Props) {
  const { title, content, children } = props
  const [isHover, setIsHover] = useState(false)
  const [style, setStyle] = useState<CSSProperties>({})

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsHover(true)
    setStyle({
      top: event.currentTarget.getBoundingClientRect().y,
      left: event.currentTarget.getBoundingClientRect().x + 70
    })
  }

  return (
    <div className='popper-container'>
      {isHover && (
        <div className='popper' style={style}>
          <h3 className='popover-header'>{title}</h3>
          <div className='popover-body'>{content || 'Trống'}</div>
        </div>
      )}
      <div onClick={handleClick} onBlur={() => setIsHover(false)}>
        {children}
      </div>
    </div>
  )
}
