import { useCallback, useRef } from "react";

export function useSound(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(src);
  }

  const play = useCallback(() => {
    const node = audioRef.current!.cloneNode() as HTMLAudioElement;
    node.volume = 0.6;
    node.play().catch(() => {
      // Autoplay can be blocked until the user interacts with the page — safe to ignore.
    });
  }, []);

  return play;
}