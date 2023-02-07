import axios from "axios";
import { useEffect, useRef, useState } from "react";

const SingleQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [random, setRandom] = useState(false)
    const [timeup,setTimeup]=useState(false)
  
    function next(id) {
        setTimeup(false)
        if (random == false) {
            setCurrent(current + 1)
        }
        else {

            setCurrent(Math.floor(Math.random() * totalQuestions) + 1)
        }
        document.getElementById(id).style = 'display:none'
        clearTimer(getDeadTime());
    }
    function previous(id) {
        setTimeup(false)
        setCurrent(current - 1)
        document.getElementById(id).style = 'display:none'
        clearTimer(getDeadTime());
    }
    function showAnswer(id) {
        document.getElementById(id).style = 'display:visible'

    }
    
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00:00');
  
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
        else{
            setTimeup(true)
        }
    }
  
  
    const clearTimer = (e) => {
  
        
        setTimer('00:00:60');
  
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
  
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    }

    
    
    useEffect(() => {
        axios.get('https://csa-exam-backend.onrender.com').then((response) => {
            setQuestions(response.data.data)
            setTotalQuestions(response.data.data.length)
            clearTimer(getDeadTime());
        })

    }, [])
    return (
        <div>

            <div style={{ marginLeft: "10%", marginRight: "5%", marginTop: "5px" }}>
                <div class="form-check form-switch">
                    <input onChange={(e)=>setRandom(e.target.checked)} class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" ></input>
                        <label class="form-check-label" >Random Question</label>
                </div>
                {random}

                <h2>{timer}</h2>

                {timeup===true && <div style={{backgroundColor:"red" ,color:"white",textAlign:"center",margin:"10px",fontSize:"40px"}}>Time Up !</div>}

                {questions?.length > 0 &&
                    <>
                        <div class="card" style={{ marginBottom: "20px" }}>
                            <div class="card-body">

                                <div
                                    dangerouslySetInnerHTML={{ __html: questions[current]['Front (html)'] }}
                                />

                                <hr></hr>
                                <div class="answer" style={{ display: 'none', color: "green" }} id={questions[current].Number}>Answer : <div
                                    dangerouslySetInnerHTML={{ __html: questions[current]['Back (HTML)'] }}
                                /> </div>
                                <button onClick={(e) => showAnswer(questions[current].Number)} style={{ marginTop: "20px" }} className="btn btn-outline-success"> Show Answer</button>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {current !== 0 && <button onClick={(e) => previous(questions[current].Number)} style={{ marginTop: "20px", marginRight: '10px' }} className="btn btn-outline-info">  Previous</button>}
                            {current !== totalQuestions && <button onClick={(e) => next(questions[current].Number)} style={{ marginTop: "20px" }} className="btn btn-outline-info"> Next</button>}

                        </div>
                    </>
                }

                <h6 style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}> Question {current + 1} / {totalQuestions}</h6>



            </div>
        </div>
    );
}

export default SingleQuestion;