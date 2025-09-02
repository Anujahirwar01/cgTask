import './App.css'
import Navbar from './components/navbar'
import Header from './components/header'
import LeadsTable from './components/leadstable'
import { Filter } from 'lucide-react';

function App() {

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="flex items-center mt-6 ml-6 space-x-4">
            <input
              className="border w-250 h-9 border-gray-300 rounded-lg p-2"
              placeholder="Search..."
            />
            <button className="bg-gray-100 text-black h-9 w-26 px-8 py-2 border border-gray-300 rounded-lg font-medium text-sm flex items-center font-black transition-colors duration-150">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>
          </div>
          <LeadsTable />
        </main>
      </div>
    </div>
  )
}

export default App