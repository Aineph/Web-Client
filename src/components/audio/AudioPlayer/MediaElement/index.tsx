/**
 * Created by Aineph for web-client.
 * Started on 27/07/2023.
 */

import React, { useCallback, useEffect } from "react"
import { AudioPlayerType } from "../index"

interface MediaElementProps {
  autoplay: boolean
  onTrackChange: (trackIndex: number) => void
  playerRef: React.MutableRefObject<AudioPlayerType | null>
  startTrack: number
  tracks: Array<string>
}

interface MediaType {
  src: string
  addEventListener: (event: string, callback: () => void) => void
  play: () => void
}

const MediaElement: React.FC<MediaElementProps> = ({
  autoplay,
  onTrackChange,
  playerRef,
  startTrack,
  tracks,
}) => {
  const onSuccess = useCallback(
    (media: MediaType) => {
      media.src = tracks.at(startTrack) || ""
      if (autoplay) {
        media.play()
      }
      media.addEventListener("ended", () => {
        const currentIndex = tracks.findIndex(track => track === media.src)
        const selectedTrack = (currentIndex + 1) % tracks.length

        onTrackChange(selectedTrack)
        media.src = tracks[selectedTrack]
        media.play()
      })
    },
    [autoplay, onTrackChange, startTrack, tracks],
  )
  const onError = useCallback((media: MediaType) => {}, [])

  useEffect(() => {
    const { MediaElementPlayer }: any = global

    if (!MediaElementPlayer || !playerRef) {
      return
    }
    playerRef.current = new MediaElementPlayer("mediaelement-player", {
      pluginPath: "/",
      iconSprite: "/mejs-controls.svg",
      success: onSuccess,
      error: onError,
    })

    return () => {
      if (playerRef.current) {
        playerRef.current.remove()
        playerRef.current = null
      }
    }
  }, [onError, onSuccess])

  return <audio controls id={"mediaelement-player"} style={{ width: "100%" }} />
}

export default React.memo(MediaElement)
