import { useState, useEffect } from 'react'
import './App.css'
import Speak from './components/Speak'
import { ReactReader } from "react-reader"
import FileUpload from './components/FileUpload'
import BeyondOrder from './Beyond.epub'

const App = () => {
  // And your own state logic to persist state
  const [location, setLocation] = useState(null)
  const [textContent, setTextContent] = useState('')
  const [ words, setWords] = useState('')
  const [ book, setBook] = useState(BeyondOrder);

  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
    const epubView = document.getElementsByClassName('epub-view')
    const iFrameContent = epubView[0].querySelector('iframe').contentDocument
    const contentParagraph = iFrameContent.querySelectorAll('p')
    
    // console.log('epubView', epubView[0])
    // console.log('iFrameContent', contentParagraph)
    // console.log('contents', contentParagraph.length)
    if(contentParagraph.length > 0) {
      let contentsArr = ``
      for(let i = 0; i < contentParagraph.length ; i++) {
        contentsArr += `${contentParagraph[i].textContent}`
        if(i > 0) {
          contentsArr += `${contentParagraph[i].textContent}/n`
        }
      }
      setWords(contentsArr)
      // console.log('contentsArr', contentsArr)
    }
  }
  console.log('BeyondOrder',BeyondOrder)
  console.log('bookType', typeof book)

  const convertBook = () => {
    const savedBook = localStorage.getItem('bookFile')
    console.log('savedBook', savedBook)
    
    const cleanedBook = JSON.parse(savedBook)
    cleanedBook.lastModifiedDate = new Date(cleanedBook.lastModifiedDate)
    setBook(cleanedBook)
  }
  // convertBook()
  // useEffect(() => {
  //   const savedBook = localStorage.getItem('bookFile')
  //   console.log('savedBook', savedBook)
  //   const cleanedBook = JSON.parse(savedBook)
  //   // cleanedBook.lastModifiedDate = new Date(cleanedBook.lastModifiedDate)
  //   console.log('savedBook size', cleanedBook)
  //   // const reader = new FileReader()
  //   // reader.onload  = () => {
  //   //   console.log('file loaded')
  //   //   // const fileBook = new File(cleanedBook.size ,cleanedBook)
  //   //   // console.log('fileBook', fileBook)
  //   // }

  //   // fileReader.error = function() {
  //   //   console.log('file error')
  //   //   // const fileBook = new File(cleanedBook.size ,cleanedBook)
  //   //   // console.log('fileBook', fileBook)
  //   // }

  //   // const fileBook = fileReader.readAsText( cleanedBook );
  //   // const fileBook = new FileReader(cleanedBook)
  //   // console.log('fileBook', fileBook)

  // }, [])

  return (
    <div>
      <div style={{ height: "100vh"}}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={book}  
          // url={book || "https://react-reader.metabits.no/files/alice.epub"}
        />
      </div>
      <Speak words={words} />
      {/* <FileUpload book={book} setBook={setBook} />
      <button onClick={convertBook}>Boom</button> */}
    </div>
  )
}

export default App