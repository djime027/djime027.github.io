const audioPlayer = document.getElementById('audioPlayer');
const toggleButton = document.getElementById('toggleLanguage');
const transcriptEs = document.getElementById('transcript-es');
const transcriptEn = document.getElementById('transcript-en');
const backwardButton = document.getElementById('backwardButton');
const forwardButton = document.getElementById('forwardButton');

// Initial setup: Show Spanish transcript by default
transcriptEs.classList.add('active');

audioPlayer.addEventListener('timeupdate', () => {
  const currentTime = audioPlayer.currentTime;

  const activeTranscript = document.querySelector('.transcript.active');
  const transcriptParagraphs = activeTranscript.querySelectorAll('p');

  transcriptParagraphs.forEach((p) => {
    const startTime = parseFloat(p.getAttribute('data-start'));
    const endTime = parseFloat(p.getAttribute('data-end'));

    if (currentTime >= startTime && currentTime < endTime) {
      p.classList.add('highlight');
      // Scroll only the transcript container to the highlighted paragraph
      const transcriptContainer = activeTranscript.parentElement;
      transcriptContainer.scrollTop = p.offsetTop - transcriptContainer.offsetTop;
    } else {
      p.classList.remove('highlight');
    }
  });
});

toggleButton.addEventListener('click', () => {
  if (transcriptEs.classList.contains('active')) {
    transcriptEs.classList.remove('active');
    transcriptEn.classList.add('active');
    toggleButton.textContent = 'Switch to Spanish';
  } else {
    transcriptEn.classList.remove('active');
    transcriptEs.classList.add('active');
    toggleButton.textContent = 'Switch to English';
  }
});

backwardButton.addEventListener('click', () => {
  audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
});

forwardButton.addEventListener('click', () => {
  audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
});
