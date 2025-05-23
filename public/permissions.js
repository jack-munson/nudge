const video = document.getElementById('video');

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('camera-button');
    button.addEventListener('click', setupCamera);
});

// Start webcam
async function setupCamera() {
    // await loadModel();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ // Request webcam access
        video: {
          width: 640,
          height: 480,
          frameRate: { max: 5 },
          facingMode: 'user'
        },
        audio: false
      });
      
      // Connect stream to video HTML element
      video.srcObject = stream;
      
      // Wait for video to be loaded
      video.onloadedmetadata = () => {
        video.play();
        // Start processing frames
        // processFrames();
      };

      chrome.runtime.sendMessage({ type: 'CAMERA_GRANTED'});
  
    } catch (error) {
      console.error('Error accessing webcam:', error.message);
      chrome.runtime.sendMessage({ type: 'CAMERA_DENIED'});
    }
}