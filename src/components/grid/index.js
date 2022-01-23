import React, {useState, useEffect, useRef} from 'react'
import {useInterval, getRandomCoords} from '../../../utils'


export default function Grid({updateScore}) {
   


    const initialGrid = []
    for (let i = 0; i < 20; i++) {
        initialGrid.push([])
        for (let k = 0; k < 20; k++) {
            initialGrid[i].push('grid-item')
        }
    }
    const initialSnake = [{x:1,y:1},{x:1,y:2}, {x:1,y:3},{x:1,y:4}]
    const foodTypes = {
        0: 1,
        1: 5,
        2: 10
    }

   

const [grid, setGrid] = useState(initialGrid)
const [snake, setSnake] = useState(initialSnake)
const [food, setFood] = useState(calculateFoodType)
const [direction, setDirection] = useState('right')
const [speed, setSpeed] = useState(600)
const [points, setPoints] = useState({totalPoints: 0, fiftyPointsCount: 0})
const [gameOver, setGameOver] = useState(false)



const onkeyDownRef = useRef(onKeyDown)
onkeyDownRef.current = onKeyDown
const prevDirectionRef = useRef()


useEffect(() => {
    const handler = e => onkeyDownRef.current(e)
    document.addEventListener('keydown', handler)
    return () => removeEventListener('keydown', handler)
}, [])


useEffect(() => {
    if(points.fiftyPointsCount >= 50) {
        increaseSpeed(speed)
        setPoints(points => {
            return {
                ...points, fiftyPointsCount: 0
            }
        })
    }
    prevDirectionRef.current = direction
    ifHitWall()
})

const prevDir = prevDirectionRef.current

useEffect(() => {
        if(gameOver && points?.totalPoints) {
              updateScore(points.totalPoints)
        }
}, [gameOver])



function increaseSpeed(currentSpeed) {
           if(
               currentSpeed < 10
           ) {
               setGameOver(true)
           } else {
               setSpeed(currentSpeed / 2)
           }
    }


function onKeyDown({keyCode}) {
    let dir = direction
    switch(keyCode) {
        // prevent from moving tail direction   
           case 37: 
           dir = (dir === 'right') ? 'right': 'left'
               setDirection(dir)
               break;
           case 38: 
            dir = (dir === 'down') ? 'down' : 'up'
           setDirection(dir)
               break;
           case 39:
           dir = (dir === 'left') ? 'left' : 'right'
               setDirection(dir)
               break;
           case 40:
           dir = (dir === 'up') ? 'up' : 'down'
               setDirection(dir)
               break;
            case 32:
            setDirection(prevDirection => {
                   if(prevDirection !== 'stop') {
                       return 'stop'
                   }
                   else {
                       return prevDir
                   }
               })         
       }
}

const displaySnake = () => {
    const newGrid = initialGrid
    snake.forEach(cell => {
        newGrid[cell.x][cell.y] = 'snake'
    });
    newGrid[food.x][food.y] = `food${String(food.foodType)}`
    setGrid(newGrid)
}

function calculateFoodType (){
    const coords = getRandomCoords()
    const foodType = foodTypes[Math.floor((Math.random() * 3))]
    return Object.assign({}, coords,  {foodType})
}



function ifHitWall() {
    let head = snake[snake.length - 1]
    if ((head.y === 20 )|| (head.y < 0 ) || (head.x === 20) || (head.x < 0)) {
        setGameOver(true)
        setSpeed(null)
    }
}

const moveSnake = () => {
    const newSnake = [...snake]
    let head = {...newSnake[snake.length - 1]}
    
    switch(direction) {
        case 'left':  head.y += -1; break;    
        case 'up':    head.x += -1; break;
        case 'right': head.y += 1;  break;
        case 'down':  head.x += 1;  break;
        default: return;
    }
    // check if snake hit its body, set game over
    for (let el of newSnake) {
        if (
            (el.y === head.y) && (el.x === head.x)
        ) {
            setSpeed(null)
            setGameOver(true)
        }
    }
    newSnake.push(head)
    // check if snake eats food
    if(head.x === food.x && head.y === food.y) {
       setPoints(points => {
          return  {totalPoints: points.totalPoints + food.foodType, 
                   fiftyPointsCount: points.fiftyPointsCount + food.foodType
        }
    })
       
       setFood(calculateFoodType());
    } else {
        newSnake.shift()
    }
        setSnake(newSnake)
        displaySnake()
}



function onRestartTheGame() {
      setSpeed(500)
      setDirection('right')
      setGameOver(false)
      setGrid(initialGrid)
      setSnake(initialSnake)
      setFood(calculateFoodType())
      setPoints({totalPoints: 0, fiftyPointsCount: 0})
  }


useInterval(moveSnake, speed)

const displayGrid = grid.map(row => {
    return (
        row.map(value => {
            return (<div className={value}></div>)
        })
    )
})


  
    return (
        <div className='grid-container'>
            {gameOver && <div className = 'game-over'>
                                <h4>game over</h4>
                                <button className='bt' onClick={onRestartTheGame}>
                                    restart the game
                                </button>
                         </div>
            }
            {
                ((direction === 'stop') && !gameOver) && <div className = 'game-over'>
                                            <h4>Pause. Press space to resume</h4>
                                           </div>
            }
            <div className='score'>Your Score: {points.totalPoints}</div>
            <div className='grid'>
                {displayGrid}
            </div>
            
        </div>
        
    )
}
