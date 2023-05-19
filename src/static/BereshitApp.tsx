import React, {Component, useEffect, useState} from "react";
import "./BereshitApp.css";

function BereshitApp() {
    const [idea, setIdea] = useState({})
    const [percentYes, setPercentYes] = useState(0);
    const [percentNo, setPercentNo] = useState(0);
    const [showResult, setShowResult] = useState(false)

    const getPutOptions = () => {
        return {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: {}
        }
    }

    const onVote = (up: boolean) => {
        let options = getPutOptions()
        options.body.vote = up ? "up" : "down";
        let addUp = up ? 1 : 0;
        let addDown = up ? 0 : 1;
        let totalVotes = idea["upVotes"] + idea["downVotes"] + 1;
        options.body.ideaId = idea["_id"] ;
        options.body = JSON.stringify(options.body);
        fetch('/api/idea/vote/', options).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            setIdea(data)
        })
        setPercentYes((idea["upVotes"] + addUp) / totalVotes * 100)
        setPercentNo((idea["downVotes"] + addDown) / totalVotes * 100)
        setShowResult(true)
        // send vote & show results
    }

    useEffect(() => {
        fetch('/api/idea/random/').then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            setIdea(data)
        })
    }, [])

    return (<div className="BereshitApp"> {
            showResult ? <> <h1> The Chosen people have spoken! </h1>
                    <div>
                        {idea["ideaText]"]}
                    </div>
                    <div>
                        will save American Judaism - {percentYes}%
                    </div>
                    <div>
                        will not save American Judaism - {percentNo}%
                    </div>
                    <div>
                        <button>Next idea</button>
                        <button>I have a better idea!</button>
                    </div>
                </>
                : <>
                    <h1>Surely...</h1>
                    <div>
                        {idea["ideaText"]}
                    </div>
                    <div>
                        <button onClick={() => onVote(true)}>will save American Judaism</button>
                        <button onClick={() => onVote(false)}>won't save Amercian Judaism</button>
                    </div>
                </>
        }
        </div>
       )
}


export default BereshitApp;