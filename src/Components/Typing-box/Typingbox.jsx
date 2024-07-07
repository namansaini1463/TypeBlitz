import { generate } from "random-words";
import { createRef, useEffect, useMemo, useRef, useState } from "react";

import UpperMenu from "../Upper-menu/UpperMenu";
import Stats from "../Stats/Stats";

import "./Typingbox.scss";
import { useMyTestMode } from "../../Context/TestModeContext";

function Typingbox() {
  const inputRef = useRef(null);

  const { testTime } = useMyTestMode();

  const [countDown, setCountDown] = useState(testTime);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [correctCharsTyped, setCorrectCharsTyped] = useState(0);
  const [incorrectCharsTyped, setIncorrectCharsTyped] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraCharsTyped, setExtraCharsTyped] = useState(0);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [correctWordsTyped, setCorrectWordsTyped] = useState(0);

  const [graphData, setGraphData] = useState([]);

  const [words, setWords] = useState(() => {
    return generate(60);
  });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const wordsRef = useMemo(() => {
    return (
      Array(words.length)
        .fill(0)
        // eslint-disable-next-line no-unused-vars
        .map((_) => createRef(null))
    );
  }, [words]);

  //` Function to start the test as soon as the user starts typing
  const startTimer = () => {
    const interval = setInterval(timer, 1000);
    // const interval = setInterval(timer, 100);
    setIntervalId(interval);

    function timer() {
      setCountDown((countDown) => {
        setCorrectCharsTyped((correctCharsTyped) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - countDown + 1,
                correctCharsTyped / 5 / ((testTime - countDown + 1) / 60),
              ],
            ];
          });

          return correctCharsTyped;
        });

        if (countDown == 1) {
          setTestEnd(true);
          clearInterval(interval);
        }
        return countDown - 1;
      });
    }
  };

  //` Function to reset the test
  const resetTest = () => {
    clearInterval(intervalId);

    setCountDown(testTime);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTestStart(false);
    setTestEnd(false);

    setWords(generate(60));
    resetWordsRefClassName();
    focusInput();
  };

  const resetWordsRefClassName = () => {
    wordsRef.map((word) =>
      Array.from(word.current.childNodes).map(
        (character) => (character.className = "")
      )
    );
    wordsRef[0].current.childNodes[0].className = "current";
  };

  //`Function to Calculate Words Per Minute
  const calculateWPM = () => {
    return correctCharsTyped / 5 / (testTime / 60);
  };
  //`Function to Calculate RAW Words Per Minute
  const calculateRawWPM = () => {
    return totalCharsTyped / 5 / (testTime / 60);
  };
  //` Function to caluclate ACCURACY
  const calculateAccuracy = () => {
    return (correctWordsTyped / currentWordIndex) * 100;
  };

  //` Handling all keyboard inputs
  const handleUserInput = (e) => {
    //Starting the timer when the user starts typing and setting the testStart variable to true
    if (!testStart) {
      setTestStart(true);
      startTimer();
    }

    const currentChars = wordsRef[currentWordIndex].current.childNodes;
    //`Handling the user input for SPACEBAR
    if (e.keyCode === 32) {
      let correctCharsInWord =
        wordsRef[currentWordIndex].current.querySelectorAll(".correct");
      if (correctCharsInWord.length === currentChars.length) {
        setCorrectWordsTyped((correctWordsTyped) => correctWordsTyped + 1);
      }

      if (currentCharIndex === currentChars.length) {
        //removing the cursor
        currentChars[currentCharIndex - 1].classList.remove("current-right");
      } else if (currentCharIndex < currentChars.length) {
        currentChars[currentCharIndex].classList.remove("current");
        setMissedChars(
          (missedChars) =>
            missedChars + (currentChars.length - currentCharIndex)
        );
      }

      wordsRef[currentWordIndex + 1].current.childNodes[0].className =
        "current";

      // moving to the next word, and setting the current char to 0
      setCurrentWordIndex((currentWordIndex) => currentWordIndex + 1);
      setCurrentCharIndex(0);

      return;
    }

    //`Handling the BACKSPACE
    if (e.keyCode === 8) {
      if (currentCharIndex > 0) {
        if (currentChars[currentCharIndex - 1].className.includes("overflow")) {
          // handling the overflow characters
          currentChars[currentCharIndex - 1].remove();
          currentChars[currentCharIndex - 2].classList.add("current-right");
        } else if (currentCharIndex === currentChars.length) {
          //handling the last letter of a word
          currentChars[currentCharIndex - 1].className = "";
          currentChars[currentCharIndex - 1].className = "current";
        } else {
          currentChars[currentCharIndex].className = "";
          currentChars[currentCharIndex - 1].className = "current";
        }
        setCurrentCharIndex((currentCharIndex) => currentCharIndex - 1);
      }
      return;
    }

    function isLetter(str) {
      return str.length === 1 && str.match(/[a-z]/i);
    }

    //` Handling the over typing overflow
    if (currentCharIndex === currentChars.length) {
      if (isLetter(e.key)) {
        let newLetter = document.createElement("span");

        newLetter.innerText = e.key;
        newLetter.classList.add("incorrect");
        newLetter.classList.add("overflow");
        newLetter.classList.add("current-right");

        // removing the cursor from the char
        currentChars[currentCharIndex - 1].classList.remove("current-right");

        //adding the new letter to the list of letters for the current word
        wordsRef[currentWordIndex].current.append(newLetter);
        //updating the length of the word
        setCurrentCharIndex((currentCharIndex) => currentCharIndex + 1);
        setExtraCharsTyped((extraCharsTyped) => extraCharsTyped + 1); //& increamenting the extra chars typed
        setTotalCharsTyped((totalCharsTyped) => totalCharsTyped + 1); //& increamenting the total chars typed
      }

      return;
    }

    //` Handling the user input for words and letters
    if (
      currentCharIndex < currentChars.length &&
      e.key === currentChars[currentCharIndex].innerText
    ) {
      currentChars[currentCharIndex].className = "correct";
      setCorrectCharsTyped((correctChars) => correctChars + 1); //&incrementing the correct character count
      setTotalCharsTyped((totalCharsTyped) => totalCharsTyped + 1); //& incrementing the total characters typed count
    } else if (currentCharIndex < currentChars.length) {
      currentChars[currentCharIndex].className = "incorrect";
      setIncorrectCharsTyped((incorrectChars) => incorrectChars + 1); //&incrementing the incorrect character count
      setTotalCharsTyped((totalCharsTyped) => totalCharsTyped + 1); //& incrementing the total characters typed count
    }

    //`moving the cursor
    if (currentCharIndex === currentChars.length - 1) {
      // if we are at the end of the current word
      currentChars[currentCharIndex].classList.add("current-right");
      setCurrentCharIndex((currentCharIndex) => currentCharIndex + 1);
    } else if (currentCharIndex < currentChars.length - 1) {
      currentChars[currentCharIndex + 1].className = "current";
      setCurrentCharIndex((currentCharIndex) => currentCharIndex + 1);
    }
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  // this is trigerred when the test time is updated
  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordsRef[0].current.childNodes[0].className = "current";
  }, []);

  return (
    <div className="type-box" onClick={focusInput}>
      <UpperMenu countDown={countDown} />
      {/* //`choosing between the typing test screen and the test end screen */}
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          rawWpm={calculateRawWPM()}
          correctChars={correctCharsTyped}
          incorrectChars={incorrectCharsTyped}
          missedChars={missedChars}
          extraChars={extraCharsTyped}
          accuracy={calculateAccuracy() ? calculateAccuracy() : 0}
          graphData={graphData}
        />
      ) : (
        <div className="words">
          {words.map((word, index) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <span className="word" ref={wordsRef[index]}>
                {word.split("").map((char) => {
                  // eslint-disable-next-line react/jsx-key
                  return <span className="letter">{char}</span>;
                })}
              </span>
            );
          })}
        </div>
      )}
      <input
        type="text"
        onKeyDown={handleUserInput}
        className="hidden-input"
        ref={inputRef}
      />
    </div>
  );
}

export default Typingbox;
