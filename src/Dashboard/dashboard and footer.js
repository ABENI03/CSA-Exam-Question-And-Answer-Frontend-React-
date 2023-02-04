import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">CSA Questions</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href='/' >All Questions</a>
              </li>
              <li class="nav-item">
                <a href='/singlequestion' class="nav-link">Single Question</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <footer class="footer mt-auto py-3 bg-light" style={{position:"fixed", left: "0",
  bottom: "0",
  width:" 100%",
  color: "white",
  textAlign: "center" }}  >
        <div class="container">
          <span class="text-muted">Powered By : <a href="https://www.linkedin.com/in/abnezer-anbessie-972275212/"> Abnezer Anbessie</a></span>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;