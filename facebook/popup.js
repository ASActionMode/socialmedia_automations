document.addEventListener('DOMContentLoaded', function() { // popup.js
  document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js'] // get content from main script
      });
    });
  });

  document.getElementById('pause').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: pauseScript
      });
    });
  });

  document.getElementById('resume').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: resumeScript
      });
    });
  });

  document.getElementById('stop').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: stopScript
      });
    });
  });

  const githubLink = document.getElementById('github-link');
  githubLink.addEventListener('click', function() {
    chrome.tabs.create({ url: 'https://github.com/ASActionMode/socialmediabot' });
  });

  const facebookLink = document.getElementById('facebook-link');
  facebookLink.addEventListener('click', function() {
    chrome.tabs.create({ url: 'https://facebook.com' });
  });

  function pauseScript() {
    window.paused = true;
    console.log("Script paused."); // use Browser Inspect window to view these logs when they are printed.
  }

  function resumeScript() {
    window.paused = false;
    console.log("Script resumed.");
  }

  function stopScript() {
    window.stopped = true;
    console.log("Script stopped.");
  }
});