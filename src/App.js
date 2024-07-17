// App.js
import React ,{useEffect} from 'react';

import TaskList from './components/TaskList';
const TawkToScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/6697641632dca6db2cb1111a/1i2vltv1d';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

function App() {
  return (
    
    <div className="App">
    
      <TaskList />
      <TawkToScript />
    </div>
  );
}

export default App;
