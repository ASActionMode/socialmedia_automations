// content.js
(function() {
  let actionChoice = prompt("What would you like to do?\n1. Accept Follow Requests\n2. Send Follow Requests\n3. Both (Accept and Send)", "3");

  let total = parseInt(prompt("Total requests?", 50));
  let increaseDelayAfter = parseInt(prompt("After how many requests do you want to increase the delay?", 15));
  let initialDelay = parseInt(prompt("Enter your initial delay (in seconds)", 120)) * 1000;
  let increasedDelay = parseInt(prompt("Enter your increased delay (in seconds)", 200)) * 1000;

  let delayTime = initialDelay;
  let added = 0; // keeping track

  window.paused = false;
  window.stopped = false;
  // if you want to see console.log, see Inspect's console window
  async function addFollowers() {
    try {
      let buttons = getButtonsByText('Follow');
      let totalButtons = buttons.length;
      console.log('Total profiles on page: ' + totalButtons);

      for (let i = 0; i < buttons.length; i++) {
        if (window.stopped) {
          console.log("Script stopped.");
          return;
        }
        
        while (window.paused) {
          console.log("Script paused.");
          await new Promise(r => setTimeout(r, 1000));
        }

        let target = buttons[i];
        if (target) {
          target.click();
          added++;
          console.log("Follow Button Clicked: " + added);

          if (added % increaseDelayAfter == 0) {
            delayTime = (delayTime == initialDelay) ? increasedDelay : initialDelay;
            console.log(`Delay changed to: ${delayTime / 1000} seconds after ${added} requests.`);
          }

          if (added % 20 == 0) {
            let wait = 30 * 1000;
            console.log("Waiting for " + wait / 1000 + " seconds!");
            await new Promise(r => setTimeout(r, wait));
          }

          await new Promise(r => setTimeout(r, delayTime));

          if (added == totalButtons && added < total) {
            const currentScrollPosition = window.scrollY;
            window.scrollTo(0, currentScrollPosition + 10000);
            await new Promise(r => setTimeout(r, 1000));
            buttons = getButtonsByText('Follow');
            totalButtons = buttons.length;
          } else if (added >= total) {
            alert(`Follow Requests Sent: ${added}\n\nThis searches for "Follow" buttons. Make sure there is a "Follow" button on the current page you're viewing, or this won't work.`);
            break;
          }
        }
      }
    } catch (err) {
      console.log(`Error Occurred: ${err}`);
    }
  }

  async function acceptFollowers() {
    try {
      let buttons = getButtonsByText('Confirm');
      for (let button of buttons) {
        if (window.stopped) {
          console.log("Script stopped.");
          return;
        }

        while (window.paused) {
          console.log("Script paused.");
          await new Promise(r => setTimeout(r, 1000));
        }

        button.click();
        await new Promise(r => setTimeout(r, 1000));
      }
      console.log("Accepted all follow requests on this page.");
    } catch (err) {
      console.log(`Error Occurred: ${err}`);
    }
  }

  function getButtonsByText(text) {
    return Array.from(document.querySelectorAll('button')).filter(btn => btn.textContent.trim() === text);
  }

  async function startActions() {
    console.log("Script has been started.");
    try {
      if (actionChoice == "1" || actionChoice == "3") {
        await acceptFollowers();
      }
      if (actionChoice == "2" || actionChoice == "3") {
        await addFollowers();
      }
    } catch (err) {
      console.log(`Error Occurred: ${err}`);
    }
  }

  if (initialDelay >= 0 && initialDelay != null) {
    if (initialDelay == 0) {
      if (confirm("Are you sure you want to proceed with a delay of 0 seconds? It is too fast and there is a chance Instagram might temporarily block you. Recommend delay of 3-5 seconds.")) {
        startActions();
      } else {
        console.log("Script didn't start\nIt is recommended to use a delay of at least 5 seconds to avoid any risk.");
      }
    } else {
      startActions();
    }
  } else {
    alert("Failed to Start!");
  }
})();
