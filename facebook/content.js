(function() {
  let actionChoice = prompt("What would you like to do?\n1. Accept Friend Requests\n2. Send Friend Requests\n3. Both (Accept and Send)", "3");

  let total = parseInt(prompt("Total requests?", 50));
  let increaseDelayAfter = parseInt(prompt("After how many requests do you want to increase the delay?", 15));
  let initialDelay = parseInt(prompt("Enter your initial delay (in seconds)", 120)) * 1000;
  let increasedDelay = parseInt(prompt("Enter your increased delay (in seconds)", 200)) * 1000;

  let delayTime = initialDelay;
  let added = 0; // keeping track

  window.paused = false;
  window.stopped = false;

  async function addFriends() {
    try {
      let buttons = document.querySelectorAll("[aria-label='Add friend'], [aria-label='Add Friend']");
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
          console.log("Add Friend Button Clicked: " + added);

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
            buttons = document.querySelectorAll("[aria-label='Add friend'], [aria-label='Add Friend']");
            totalButtons = buttons.length;
          } else if (added >= total) {
            alert(`Friend Requests Sent: ${added}\n\nThis searches for "aria-label" with Text called "Add Friend" make sure there is a Button in the current page you're viewing with a button saying "Add Friend," or this won't work.`);
            break;
          }
        }
      }
    } catch (err) {
      console.log(`Error Occurred: ${err}`);
    }
  }

  async function acceptFriends() {
    try {
      let buttons = document.querySelectorAll("[aria-label='Confirm']");
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
      console.log("Accepted all friend requests on this page.");
    } catch (err) {
      console.log(`Error Occurred: ${err}`);
    }
  }

  async function startActions() {
    console.log("Script has been started.");
    try {
      if (actionChoice == "1" || actionChoice == "3") {
        await acceptFriends();
      }
      if (actionChoice == "2" || actionChoice == "3") {
        await addFriends();
      }
    } catch (err) {
      console.log(`Error Occurred: ${err}`);
    }
  }

  if (initialDelay >= 0 && initialDelay != null) {
    if (initialDelay == 0) {
      if (confirm("Are you sure you want to proceed with a delay of 0 seconds? It is too fast and there is a chance Facebook might temporarily block you. Recommend delay of 3-5 seconds.")) {
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
