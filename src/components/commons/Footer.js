import React, { useRef } from 'react'
import { useNearscreen } from '../../hooks/useNearScreen'

export const Footer = () => {

    const element = useRef(null);

    const isNearScreen = useNearscreen(element)

    return (
        <footer
            ref={element}
            className="footer">
            {
                (isNearScreen && <span>A project made with love by <a href="https://github.com/dijevic"> Diego Vielma</a> </span>)
            }
        </footer>
    )
}


