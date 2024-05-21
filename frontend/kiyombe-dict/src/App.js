import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body className="canvas">
      <div className="navbar">
        <div className="site_title_main">
          Kiyom.be
        </div>
      </div>
      <div className="intro">
        <h2 className="intro_text_main">
          Apprenez le Kiyombe,
        </h2>
        <h2 className="intro_text_secondary">
          un mot à la fois 
        </h2>
      </div>
      <div className="intro_buttons">
        <button class="intro_button">Cherchez un mot</button>
        <div class="divider1"/>
        <button class="intro_button">Soyez surpris</button>
      </div>
    </body>
  );
}

export default App;
