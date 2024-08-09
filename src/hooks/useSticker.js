import { useEffect, useState } from "react";

export function useSticker(pushMessage, channel) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiPositions, setEmojiPositions] = useState([]);
  const [isEmojiEnabled, setIsEmojiEnabled] = useState(false);

  const onHandleClick = () => {
    if (isEmojiEnabled) {
      disableEmoji();
    } else {
      enableEmoji();
    }
    setIsEmojiEnabled(prevState => !prevState);
  };

  useEffect(() => {
   
    function computePointInCanvas(clientX, clientY) {
      const boundingRect = document.documentElement.getBoundingClientRect();
      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top
      };
    }

    function handleScreenClick(e) {
      if (showEmoji) {
        const point = computePointInCanvas(e.clientX, e.clientY);
        setEmojiPositions((prevPositions) => [...prevPositions, point]);
        pushMessage(JSON.stringify({ type: 'emoji', point }), channel);
      }
    }

    if (showEmoji) {
      window.addEventListener('click', handleScreenClick);
    }

    return () => {
      window.removeEventListener('click', handleScreenClick);
    };
  }, [showEmoji, pushMessage, channel]);

  function enableEmoji() {
    setShowEmoji(true);
  }

  function disableEmoji() {
    setShowEmoji(false);
  }

  return {
    enableEmoji,
    disableEmoji,
    onHandleClick,
    emojiPositions
  };
}
