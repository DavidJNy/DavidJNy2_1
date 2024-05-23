import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const projects = [
  {
    title: 'Project One',
    description: 'Description for project one. This project is about...',
    imageUrl: 'https://via.placeholder.com/800x400',
    link: 'https://example.com/project-one'
  },
  {
    title: 'Project Two',
    description: 'Description for project two. This project involves...',
    imageUrl: 'https://via.placeholder.com/800x400',
    link: 'https://example.com/project-two'
  },
  {
    title: 'Project Three',
    description: 'Description for project three. The main focus is...',
    imageUrl: 'https://via.placeholder.com/800x400',
    link: 'https://example.com/project-three'
  },
  {
    title: 'Project Four',
    description: 'Description for project three. The main focus is...',
    imageUrl: 'https://via.placeholder.com/800x400',
    link: 'https://example.com/project-three'
  },
  // Add more projects as needed
];

const ProjectCarousel = () => {
  return (
    <div className="container mt-5">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable>
        {projects.map((project, index) => (
          <div className='px-2' key={index}>
            <img
              className="d-block w-100"
              src={project.imageUrl}
              alt={project.title}
            />
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProjectCarousel;