import { useState, useCallback } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Countdown from './components/Countdown';
import OurStory from './components/OurStory';
import EventDetails from './components/EventDetails';
import Schedule from './components/Schedule';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(
    () => !!sessionStorage.getItem('wedding-preloader-blush-seen')
  );

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {/* Preloader — only on first session visit */}
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main content */}
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <Nav />
        <Hero isPreloaderDone={preloaderDone} />
        <Countdown />
        <OurStory />
        <EventDetails />
        <Schedule />
        <Gallery />
        <Footer />
      </div>
    </>
  );
}

export default App;
