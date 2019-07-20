import { Container, Nav } from 'react-bootstrap';
import React from 'react';

import { RouterLink } from './components/navigation';
import lessons from './components/navigation/lessons';

const Home = () => (
  <Container>
    <div className="mt-4 text-justify">
      Welcome to the Intro to React Workshop. You can navigation to any lesson by using the dropdown menu in the upper-right corner, or clicking any of the links down below. All of these lessons include an instructional page about the concept being presented, along with a coding exercise to be done within the project itself.
    </div>
    <div className="mt-4 text-justify">
      If you get stuck during the exercise, or just want some additional information in general about the topic at hand, each lesson comes with additional tips that can be opened whenever you need them. Most lessons also include some additional links along the top of the screen, relevant to whichever topic is being presented at the time.
    </div>
    {Object.keys(lessons).length > 0 && (
      <div className="mt-4">
        <h2>Lessons</h2>
        <Nav className="flex-column">
          {Object.keys(lessons).map(url => (
            <Nav.Link as={RouterLink} key={url} href={url}>{lessons[url]}</Nav.Link>
          ))}
        </Nav>
      </div>
    )}
  </Container>
);

export default Home;
