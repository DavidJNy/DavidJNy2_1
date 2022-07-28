import React from 'react';
import { projects } from '../data';
import constructImg from './images/underConstruct.png'
import './styles/Projects.css';


function Projects() {

    return (
        <div id="Projects" class="container p-3 mb-2 bg-dark">
            <div class="p-3 mb-2 bg-dark">
                <div class="p-3 mb-2 text-center">
                    <h1>
                        Apps and projects
                    </h1>
                    <p>
                        Here is a list of my active/prospective projects.
                    </p>
                </div>
                <div class="row justify-content-center">
                    {projects.map((project) => (
                        <a class="main_div card d-flex bg-white" href={project.link} key={project.title}>
                            {project.status === "Incomplete" ? <img class="card-img-overlay m-5" src={constructImg} alt="" /> : null}
                            <img class="border m-3 border-dark" src={project.image} alt="" />
                            <div class='sub_div d-flex align-self text-center text-black flex-column'>
                                <h4>
                                    {project.title}
                                </h4>
                                <p>{project.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;