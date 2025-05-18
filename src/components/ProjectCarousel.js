import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const projects = [
  {
    title: 'Deep Value Trades',
    description: 'Find some oversold stock for a bounce',
    imageUrl: 'https://media1.moneywise.com/a/27475/how-to-read-stock-charts_facebook_thumb_1200x628_v20230821170156.jpg',
    link: '/DeepValueTrade'
  },
  {
    title: 'Helena Ny Hair Dresser',
    description: 'Hair dresser',
    imageUrl: 'https://hairandsouldresser.com/wp-content/uploads/2020/12/idaho-springs-hairstylist-05.png',
    link: 'https://hairandsouldresser.com/'
  },
  {
    title: 'Park Buddy',
    description: 'Find out whos at the park for pick up games.',
    imageUrl: 'https://i.ytimg.com/vi/nd5--EqzLPY/maxresdefault.jpg',
    link: '/ParkBuddy'
  },
  {
    title: 'Dad Jokes',
    description: 'Want some quick dad jokes?',
    imageUrl: 'https://s3-prod.adage.com/s3fs-public/20230109_Progressive-Insurance_TV-Dad-Braces_3X2.jpg',
    link: '/Jokes'
  },
  {
    title: 'Vortex',
    description: 'Deep meditation Vortex',
    imageUrl: 'https://imageio.forbes.com/specials-images/imageserve/478975315/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds',
    link: '/Vortex'
  }
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
              className="d-block w-100 img-thumbnail"
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