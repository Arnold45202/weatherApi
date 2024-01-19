import React from 'react';
import Weather from './weather';

function App() {
  const backgroundImageStyle = {
    backgroundImage: `url()`,
  };

  return (
    <div className="App" style={backgroundImageStyle}>
      <Weather />
    </div>
  );
}

export default App;
