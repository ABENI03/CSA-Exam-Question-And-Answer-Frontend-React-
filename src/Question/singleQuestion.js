import axios from "axios";
import { useEffect, useState } from "react";

const SingleQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)
    function next(id) {
        setCurrent(current + 1)
        document.getElementById(id).style = 'display:none'
    }
    function previous(id) {
        setCurrent(current - 1)
        document.getElementById(id).style = 'display:none'
    }
    function showAnswer(id) {
        document.getElementById(id).style = 'display:visible'

    }
    useEffect(() => {
        axios.get('http://localhost:3333').then((response) => {
            setQuestions(response.data.data)
            setTotalQuestions(response.data.data.length)

        })
    }, [])
    return (
        <div>

            <div style={{ marginLeft: "10%", marginRight: "5%", marginTop: "50px" }}>

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
                            {current!==0 && <button onClick={(e) => previous(questions[current].Number)} style={{ marginTop: "20px", marginRight: '10px' }} className="btn btn-outline-info">  Previous</button>}
                            {current!==totalQuestions &&  <button onClick={(e) => next(questions[current].Number)} style={{ marginTop: "20px" }} className="btn btn-outline-info"> Next</button>}

                        </div>
                    </>
                }

                <h6 style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}> Question {current+1} / {totalQuestions}</h6>



            </div>
        </div>
    );
}

export default SingleQuestion;