import e from 'cors';
import React, {useState} from 'react'

const Speak = ({words}) => {
  const [inputText, setInputText] = useState('');
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const synth = window.speechSynthesis;

  const inputForm = document.querySelector('form');
  const inputTxt = document.querySelector('.txt');
  const voiceSelect = document.querySelector('select');
  const pitch = document.querySelector('#pitch');
  const pitchValue = document.querySelector('.pitch-value');
  const rate = document.querySelector('#rate');
  const rateValue = document.querySelector('.rate-value');

  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  const handlePlay = (e) => {
    const utterThis = new SpeechSynthesisUtterance(words);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = speechPitch;
    utterThis.rate = speechRate;
    synth.speak(utterThis);

    inputTxt.blur();
  }

  let numString = Number(445123).toString;
  return (
    <form onSubmit={e=>e.preventDefault()}>
      <label htmlFor="txt">Enter text</label>
      <input id="txt" type="text" className="txt" value={inputText} onChange={e=> setInputText(e.target.value)} />
      <div>
        <label htmlFor="rate">Rate</label><input type="range" min="0.5" max="2" value={speechRate} step="0.1" id="rate" onChange={e=> setSpeechRate(e.target.value)} />
        <div className="rate-value">{speechRate}</div>
        <div className="clearfix"></div>
      </div>
      <div>
        <label htmlFor="pitch">Pitch</label><input type="range" min="0" max="2" value={speechPitch} step="0.1" id="pitch" onChange={e=> setSpeechPitch(e.target.value)} />
        <div className="pitch-value">{speechPitch}</div>
        <div className="clearfix"></div>
      </div>
      <select></select>
      <div className="controls">
        <button onClick={handlePlay} id="play">Play</button>
      </div>
    </form>
  )
}

export default Speak