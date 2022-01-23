import axios from 'axios'
import React, {useState, useEffect} from 'react'



export default function TopScores({updatedScore, player_name}) {
    
    const [topScores, setTopScores] = useState([])

    function getTopScores() {
        axios.get('/api/gettopscores').then(res => setTopScores(filterTopScoresFromZero(res.data.topScores)) )
    }


    function filterTopScoresFromZero(list) {
        return list.filter(item => item.score > 0)
    }


    function updateTopScores(score, name) {
        const limit = topScores.length === 5 ? 5 : topScores.length + 1
        const existingTopscorerPlayer = topScores.find(score => score.player_name === name)
        
        const newTopScores = existingTopscorerPlayer ?  topScores.map(scoreItem => {
            if (scoreItem.player_name === name) {
                return (
                    {...scoreItem, score: score}
                )
            }
            return scoreItem
        } ).sort((a, b) => b.score - a.score) : 

        [...topScores, {player_name: name, score: score}].sort((a, b) => b.score - a.score).slice(0, limit)
       
        return newTopScores
    
    }
    
    useEffect(() => {
        getTopScores()
    }, [])
   
    useEffect(() => {
            if(updatedScore) {
                const isUpdatedScoreHihger = topScores.some(score => score.score < updatedScore)
                if (isUpdatedScoreHihger) {
                    setTopScores(updateTopScores(updatedScore, player_name))
            }
        }
    }, [updatedScore])

   

    return (
        <div className='topscores'>
            <h3>Top scores</h3>
                {(topScores?.length > 0) && <ul>
                {topScores.map(score => {
        return (
            <li key={score.name}><span className='topscorer-name'>
                        {score.player_name}
                    </span>
                    <span className='topscorer-score'>
                        {score.score === null ? 0 : score.score}
                    </span>
                </li>
        )
    })}
            </ul>}
        </div>
    )
}
