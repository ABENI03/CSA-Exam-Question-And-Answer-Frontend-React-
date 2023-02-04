import Dashboard from "./Dashboard/dashboard and footer";
import AllQuestions from "./Question/allQuestions";
import SingleQuestion from "./Question/singleQuestion";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
     

      <Router>
      <Dashboard></Dashboard>
        <Routes>
          <Route  path="/" element={<AllQuestions/>} ></Route>
        </Routes>
        <Routes>
          <Route path="/singlequestion" element ={<SingleQuestion/>}></Route>
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
