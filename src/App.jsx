import { useState, useEffect } from 'react'
import './App.css'
import Speak from './components/Speak'
import { ReactReader } from "react-reader"
import FileUpload from './components/FileUpload'
import fs from 'fs';

function App() {
  const [location, setLocation] = useState(null)
  const [textContent, setTextContent] = useState('')
  const [ words, setWords] = useState('')
  const [ book, setBook] = useState('');
  // const bookItem = fs.readFile(path.resolve(__dirname, 'Beyond Order 12 More Rules for Life.epub'), 'UTF-8', callback)
  // console.log('bookItem', bookItem)
  // const [ book, setBook] = useState('https://react-reader.metabits.no/files/alice.epub');

  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
    const epubView = document.getElementsByClassName('epub-view')
    // const child = epubView.children[0];
    // if(epubView.children)
    const iFrameContent = epubView[0].querySelector('iframe').contentDocument
    const contentParagraph = iFrameContent.querySelectorAll('p')
    
    // console.log('epubView', epubView[0])
    console.log('iFrameContent', contentParagraph)
    console.log('contents', contentParagraph.length)
    if(contentParagraph.length > 0) {
      let contentsArr = ``
      for(let i = 0; i < contentParagraph.length ; i++) {
        contentsArr += `${contentParagraph[i].textContent}`
        if(i > 0) {
          contentsArr += `${contentParagraph[i].textContent}/n`
        }
      }
      setWords(contentsArr)
      console.log('contentsArr', contentsArr)
    }
    // console.log('first', epubView.firstElementChild)
    // setTextContent()
  }
  // const textContent = 
  console.log('book', book)

  // function onChange(event) {
  //   var file = event.target.files[0];
  //   var reader = new FileReader();
  //   reader.onload = function(event) {
  //     // The file's text will be printed here
  //     console.log(event.target.result)
  //   };
  
  //   reader.readAsText(file);
  // }
  
  return (
    <div>
      <div style={{ height: "100vh", width: '100vw' }}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={book}
          // url={book || "https://react-reader.metabits.no/files/alice.epub"}
        />
      </div>
      <Speak words={words} />
      <FileUpload book={book} setBook={setBook} />
    </div>
  )
}

export default App
