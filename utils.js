import { useEffect, useRef } from "react";



export function useInterval(callback, delay) {

    const savedCallback = useRef();
    
    // Remember the latest callback.
    
    useEffect(() => {
    
    savedCallback.current = callback;
    
    }, [callback]);
    
    // Set up the interval.
    
    useEffect(() => {
    
    function tick() {
    
    savedCallback.current();
    
    }
    
    if (delay !== null) {
    
    let id = setInterval(tick, delay);
    
    return () => clearInterval(id);
    
    }
    
    }, [delay]);
    
}

export function getRandomCoords () {
    let x = Math.floor((Math.random() * 20))
    let y = Math.floor((Math.random() * 20))
    
    return({x, y})
} 