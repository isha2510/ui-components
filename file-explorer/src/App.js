import './App.css';
import Folder from './components/Folder';
import explorer from './data/data.json';
function App() {
  return(
    <Folder explorer={explorer}/>
  )
}

export default App;
