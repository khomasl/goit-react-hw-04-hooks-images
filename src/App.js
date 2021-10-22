import './App.css'
import { useState } from 'react'
import Searchbar from './components/Searchbar/Searchbar'
import ImageGallery from './components/ImageGallery/ImageGallery'

export default function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <>
        <Searchbar getSearchValue={setSearchValue} />
        <ImageGallery searchValue={searchValue} />
      </>
    </div>
  )
}
