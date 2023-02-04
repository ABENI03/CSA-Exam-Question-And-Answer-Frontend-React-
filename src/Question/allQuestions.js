import axios from "axios";
import { useEffect, useState } from "react";

const AllQuestions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get('https://csa-exam-backend.onrender.com').then((response) => {
            setQuestions(response.data.data)
             console.log(questions)
        })
    }, [])
    
    function showAnswer(id){
        document.getElementById(id).style='display:visible'
        
    }
    return (
        <div>
            <div style={{ marginLeft: "10%", marginRight: "5%", marginTop: "50px" }}>

                {questions?.length > 0 && questions?.map((question) => (
                    <>
                        <div class="card" style={{ marginBottom: "20px" }}>
                            <div class="card-body">
                                
                                <div
                                    dangerouslySetInnerHTML={{ __html: question['Front (html)'] }}
                                />

                                <hr></hr>
                                <div style={{display:'none',color:"green"}} id={question.Number}>Answer : <div
                                    dangerouslySetInnerHTML={{ __html: question['Back (HTML)'] }}
                                /> </div>
                                <button onClick={(e)=>showAnswer(question.Number)} style={{ marginTop: "20px" }} className="btn btn-outline-success"> Show Answer</button>
                            </div>
                        </div>
                    </>
                ))}



            </div>

        </div>
    );
}

export default AllQuestions;