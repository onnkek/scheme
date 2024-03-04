import './App.css';
import { ContextMenuProvider } from './components/ContextMenu';
import Editor from './components/EditorComponent/EditorComponent';

function App() {

  return (
    <ContextMenuProvider>
      <Editor />
    </ContextMenuProvider>
  );
}
export default App;
