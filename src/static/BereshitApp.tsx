import React, {Component, useEffect, useState} from "react";
import "./BereshitApp.css";

function BereshitApp() {
    const [idea, setIdea] = useState("")
    const [showResult, setShowResult] = useState(false)

    const onNo = () => {
        setShowResult(true)
        // send vote & show results
    }
    const onYes = () => {
        setShowResult(true)
        // send vote & show results
    }

    useEffect(() => {
        fetch('/api/idea/random/').then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            setIdea(data["ideaText"])
        })
    }, [])

    return (<div className="BereshitApp">
        <h1>Surely...</h1>
        {idea}
        <div>
        </div>
        <div><button onClick={onYes}>will save American Judaism</button>
        <button onClick={onNo}>won't save Amercian Judaism</button></div>
    </div>)
}


export default BereshitApp;