import { useState, useEffect, useRef } from "react";



export const useNearscreen = (elementRef, /* options */) => {

    const [isIntersecting, setIsIntersecting] = useState(false);
    const [element, setElement] = useState(false);

    const observer = useRef(null)




    useEffect(() => {
        setElement(elementRef.current)

    }, [elementRef])

    useEffect(() => {

        if (!element) return

        // callback for interseptionObserver            
        const callback = (entries, observer) => {
            const element = entries[0]
            if (element.isIntersecting) {
                setIsIntersecting(true)
                observer.disconnect()/* disconnect the element */
            }
        }



        // check if i need a pollyfill
        Promise.resolve(
            (typeof IntersectionObserver !== 'undefined')
                ? IntersectionObserver
                : import('intersection-observer')

        ).then(() => {
            observer.current = new IntersectionObserver(callback, {
                rootMargin: '50px'
            })

            observer.current.observe(element)

        })

        return () => observer.current && observer.current.disconnect()

    }, [element]);

    return isIntersecting;
}