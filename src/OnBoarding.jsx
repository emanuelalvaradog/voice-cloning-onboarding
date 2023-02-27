import { useState } from "react";
import phrasesJSON from "./assets/phrases.json";
import rules from "./assets/onBoarding.json";
import { Progressor } from "./Progressor";
import { VoiceRecorder } from "./VoiceRecorder";
import { uploadFile2Bucket } from "./helpers/gcloudStorage";

export function OnBoarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [onBoardingPhase, setOnBoardingPhase] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [blobArray, setBlobArray] = useState([]);

  function handleNext(e) {
    e.preventDefault();
    if (onBoardingPhase === 0) {
      if (currentIndex < rules.length - 1) {
        return setCurrentIndex((prev) => (prev += 1));
      }
      setOnBoardingPhase((prev) => (prev += 1));
      setCurrentIndex(0);
      return;
    }

    if (onBoardingPhase === 1) {
      if (currentIndex < phrasesJSON.length - 1) {
        console.log(blobArray[currentIndex]);
        uploadFile2Bucket(
          blobArray[currentIndex],
          "carl-dataset",
          `_CD-${currentIndex}.wav`
        );
        return setCurrentIndex((prev) => (prev += 1));
      }
      setOnBoardingPhase((prev) => (prev += 1));
      setCurrentIndex(0);
      return;
    }
  }

  return (
    <div className="onBoarding">
      {onBoardingPhase === 0 ? (
        <Progressor
          text={rules[currentIndex].text}
          index={currentIndex}
          next={handleNext}
          total={rules.length}
        />
      ) : (
        <>
          <VoiceRecorder
            index={currentIndex}
            setBlobArray={setBlobArray}
            text={phrasesJSON[currentIndex].text}
            next={handleNext}
          />
        </>
      )}
    </div>
  );
}
