import { useState, useEffect, useRef } from 'react'
import './App.css'
import Speak from './components/Speak'
import { ReactReader, ReactReaderStyle } from "react-reader"
import BeyondOrder from './Beyond.epub'

const App = () => {
  // And your own state logic to persist state
  const [location, setLocation] = useState(null)
  const [textContent, setTextContent] = useState('')
  const [ words, setWords] = useState('')
  const [ book, setBook] = useState(BeyondOrder);
  const [bookLoc, setBookLoc] = useState(0)

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
      // contentParagraph[1].classList.add('read-this-thing')
      let contentsArr = ``
      for(let i = 0; i < contentParagraph.length ; i++) {
        
        // if(bookLoc > 0) {
        //   console.log('class', contentParagraph[i].classList)
        //   console.log('succ')
        // }
        
        contentsArr += `${contentParagraph[i].textContent}`
        if(i > 0) {
          contentsArr += `${contentParagraph[i].textContent}/n`
        }
      }
      setWords(contentsArr)
      // console.log('contentsArr', contentsArr)
    }
  }

  const [selections, setSelections] = useState([])
  const renditionRef = useRef(null)
  
  useEffect(() => {
    if (renditionRef.current) {
      function setRenderSelection(cfiRange, contents) {
        console.log('cfiRange', cfiRange)
        console.log('contents', contents)
        console.log('renditionRef', contents.documentElement.textContent)
        setSelections(selections.concat({
          text: renditionRef.current.getRange(cfiRange).toString(),
          cfiRange
        }))
        renditionRef.current.annotations.add("highlight", cfiRange, {}, null , "hl", {"fill": "blue", "fill-opacity": "0.5", "mix-blend-mode": "multiply"})
        contents.window.getSelection().removeAllRanges()
      }
      renditionRef.current.on("selected", setRenderSelection)
      return () => {
        renditionRef.current.off("selected", setRenderSelection)
      }
    }
  }, [setSelections, selections])

  // console.log('renderrr', renditionRef.current)

  // TODO change book contents to useRef
  useEffect(() => {
      const epubView = document.getElementsByClassName('epub-view')
      console.log('epubView', epubView)
      if(epubView.length > 0) {
        const iFrameContent = epubView[0].querySelector('iframe').contentDocument
        const contentParagraph = iFrameContent.querySelectorAll('p')
        
        // console.log('epubView', epubView[0])
        // console.log('iFrameContent', contentParagraph)
        // console.log('contents', contentParagraph.length)
        if(contentParagraph.length > 0) {
          // contentParagraph[0].classList.add('read-this-thing')
          // console.log('contentParagraph', contentParagraph[0].classList)
          contentParagraph[0].style.backgroundColor = 'yellow';
          let contentsArr = ``
          for(let i = 0; i < contentParagraph.length ; i++) {
            
            // if(bookLoc > 0) {
            //   console.log('class', contentParagraph[i].classList)
            //   console.log('succ')
            // }
            
            contentsArr += `${contentParagraph[i].textContent}`
            if(i > 0) {
              contentsArr += `${contentParagraph[i].textContent}/n`
            }
          }
        }
      }
  },[bookLoc])
  return (
    <div>
      <div style={{ height: "100vh"}}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={book}  
          // url={book || "https://react-reader.metabits.no/files/alice.epub"}
          getRendition={(rendition) => {
            renditionRef.current = rendition
            renditionRef.current.themes.default({
              '::selection': {
                'background': 'orange'
              }
            })
            setSelections([])
          }}
        />
      </div>
      <Speak words={words} setBookLoc={setBookLoc} bookLoc={bookLoc} />
      {/* <FileUpload book={book} setBook={setBook} />
      <button onClick={convertBook}>Boom</button> */}
      <h1 className='read-this-thing'>dummy</h1>
    </div>
  )
}

export default App