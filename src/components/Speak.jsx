import e from 'cors';
import React, {useState, useEffect} from 'react'
import PlayIcon from '../assets/play.svg'
import PauseIcon from '../assets/pause.svg'
import StopIcon from '../assets/stop.svg'

const Speak = ({words}) => {
  const [inputText, setInputText] = useState('');
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [ voices, setVoices] = useState([])
  const [ selectVoice, setSelectVoice] = useState(0)
  const [ play, setPlay] = useState(false)
  // const [ resume, setResume] = useState(false)
  const synth = window.speechSynthesis;

  const inputForm = document.querySelector('form');
  const inputTxt = document.querySelector('.txt');

  useEffect(() => {
    const fetchVoices = async() => {
      const voiceSynth = window.speechSynthesis;
      setVoices(voiceSynth.getVoices());
    }
    fetchVoices()
  }, [])
  
  const utterThis = new SpeechSynthesisUtterance(words);
  utterThis.voice = voices[selectVoice]
  utterThis.pitch = speechPitch;
  utterThis.rate = speechRate;

  const handlePlay = (e) => {
    if(!synth.speaking) {
      synth.speak(utterThis);
    } else {
      synth.resume(utterThis);
    }
    setPlay(true)
  }

  const handlePause = (e) => {
    if(synth.speaking) {
      synth.pause(utterThis);
    }
    setPlay(false)
  }

  const handleStop = () => {
    console.log('synth', synth.speaking)
    synth.cancel(utterThis)
  }
  return (
    <form className='fixed z-10 right-10 bottom-4' onSubmit={e=>e.preventDefault()}>
      {/* <label htmlFor="txt">Enter text</label> */}
      {/* <input id="txt" type="text" className="txt" value={inputText} onChange={e=> setInputText(e.target.value)} /> */}
      {/* <div>
        <label htmlFor="rate">Rate</label><input type="range" min="0.5" max="2" value={speechRate} step="0.1" id="rate" onChange={e=> setSpeechRate(e.target.value)} />
        <div className="rate-value">{speechRate}</div>
        <div className="clearfix"></div>
      </div>
      <div>
        <label htmlFor="pitch">Pitch</label><input type="range" min="0" max="2" value={speechPitch} step="0.1" id="pitch" onChange={e=> setSpeechPitch(e.target.value)} />
        <div className="pitch-value">{speechPitch}</div>
        <div className="clearfix"></div>
      </div>
      <select value={selectVoice} onChange={e=>setSelectVoice(e.target.value)}>
        {voices && voices.map((voice, id) => {
          return(
            <option key={id} value={id}>{voice.name}</option>
          )
        })}
      </select> */}
      
      <div className="relative top-0 p-2 border-black border shadow-md">
        { play ?
          <button className='bg-gray-200 p-2 mr-2 rounded-full' onClick={handlePause} id="pause">
            <img src={PauseIcon} alt="pause" />
          </button>:
          <button className='bg-gray-200 p-2 mr-2 rounded-full' onClick={handlePlay} id="play">
            <img src={PlayIcon} alt="play" />
          </button>
        }
        <button className='bg-gray-200 p-2' onClick={handleStop} id="stop">
          <img src={StopIcon} alt="stop" />
        </button>
      </div>
    </form>
  )
}

export default Speak