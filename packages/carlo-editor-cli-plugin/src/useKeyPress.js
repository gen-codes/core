import {useState, useEffect} from "react";
export default function useInput(listenKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler(e) {
    const {ctrlKey, shiftKey, key,} = e
    const pressedKey = `${ctrlKey ? "ctrl-" : ""}${shiftKey ?
      "shift-" : ""}${key.toLowerCase()}`;
    if(pressedKey === listenKey) {
      setKeyPressed(true);
      e.preventDefault()

    }
  }

  // If released key is our target key then set to false

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, ); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
