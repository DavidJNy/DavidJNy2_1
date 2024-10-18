
// import constructImg from './images/underConstruct.png'
import ProjectCarousel from './ProjectCarousel';

function Projects() {

    return (
      <div id="Projects" className="container">
        <div class="container fade-in-left">
          <h1 className="display-1 p-3 text-center">Apps and projects</h1>
          <p className="text-center">
            Here is a list of my active/prospective projects.
          </p>
        </div>
        <div className="project_container">
          <ProjectCarousel />
        </div>
      </div>
    );
}

export default Projects;