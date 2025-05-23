import { useEffect, useState } from 'react';
import logo from './assets/main-logo-copy.png'
import SettingsIcon from '@mui/icons-material/Settings';
import './App.css';

function App() {
  const [cameraPermission, setCameraPermission] = useState(false);

  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      if (message.type === 'CAMERA_GRANTED') {
        console.log('Camera permission granted');
        setCameraPermission(true);
      } else if (message.type === 'CAMERA_DENIED') {
        console.log('Camera permission denied');
        setCameraPermission(false);
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage);
  })

  const handleAccessClick = () => {
    window.open(
      chrome.runtime.getURL('permissions.html'), 
      'cameraWindow',
      'width=270, height=308, scrollbars=no, resizable=no'
    )
  }

  return (
    <div className='sidepanel-container'>
      <div className='sidepanel-header'>
        <img src={logo} alt='Nudge logo' className='header-logo'/>
        <SettingsIcon className='header-settings-icon'/>
      </div>
      {cameraPermission ? (
      <div className='welcome-content'>
        <div className='primary-text'>
          👋 Welcome to Nudge!
        </div>
        <div className='secondary-text'>
          Your AI-powered focus companion
        </div>
        <div className='camera-text'>
          To begin, Nudge needs access to your <br />
          camera. Please click the button below to <br />
          open a new window and grant permission. <br />
          This tab must stay open when using Nudge. <br />
        </div>
        <div className='disclaimer-text'>
          🔒Nudge never stores your data, nor do <br />
          we use you data to train our models. 
        </div>
        <button className='camera-button' onClick={handleAccessClick}>Allow camera access</button>
      </div>) : (
      <div>
        Permission granted
      </div>)}
      <div className='filler-content'>
        <div className='filler-text'>
          How Nudge works
        </div>
      </div>
    </div>
  );
}

export default App;
