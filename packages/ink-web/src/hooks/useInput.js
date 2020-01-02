import {useState, useEffect} from "react";
export default function useInput(inputHandler) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  const keys = {
    "ArrowLeft": "leftArrow",
    "ArrowRight": "rightArrow",
    "ArrowUp": "upArrow",
    "ArrowDown": "downArrow",
    "Enter": "enter"
  }
  const targetKey = "Enter"
  // If pressed key is our target key then set to true
  function downHandler({key}) {
    if(keys[key]){
      inputHandler(null, {
        [keys[key]]: true
      })

    }
  }

  // If released key is our target key then set to false

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}