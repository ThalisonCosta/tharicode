import Sidebar from "./components/Sidebar"
import CodeArea from "./components/CodeArea"
import { SourceProvider } from "./context/SourceContext"

export default function App() {
  return <div id="editor" className="flex bg-primary overflow-hidden flex items-start h-screen">
      <SourceProvider>
        <Sidebar />
        <CodeArea />
      </SourceProvider>
  </div>
}


