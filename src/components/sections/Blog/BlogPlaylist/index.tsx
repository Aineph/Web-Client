/**
 * Created by Aineph for web-client.
 * Started on 29/07/2023.
 */

import React from "react"
import { Box, Text } from "@chakra-ui/react"
import { Trans } from "react-i18next"
import AudioPlayer from "../../../audio/AudioPlayer"

interface BlogPlaylistProps {
  tracks: Array<Queries.STRAPI_AUDIO_TRACK>
}

const BlogPlaylist: React.FC<BlogPlaylistProps> = ({ tracks }) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={10}>
      <Text alignSelf={"center"} textAlign={"center"}>
        <Trans>blogPlaylistTitle</Trans>
      </Text>
      <AudioPlayer startTrack={0} autoplay={false} tracks={tracks} />
    </Box>
  )
}

export default React.memo(BlogPlaylist)
