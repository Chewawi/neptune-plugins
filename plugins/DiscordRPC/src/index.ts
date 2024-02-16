// @ts-ignore
import { currentMediaItem, intercept, store } from "@neptune";
import { getMediaURLFromID } from "@neptune/utils";
import { Album, Artists } from "neptune-types/tidal";

import { AutoClient } from "discord-auto-rpc";

interface CurrentlyPlaying {
  album: Album;
  duration: number;
  artists: Artists;
  title: string;
  url: string;
}

interface CurrentMediaItem {
  item: CurrentlyPlaying;
  type: string;
}

const unloadables: (() => void)[] = [];
const clientId = "1207821369438376026";

const formatLongString = (s: string): string =>
  s.length >= 128 ? s.slice(0, 125) + "..." : s;

const rpc = new AutoClient({ transport: "ipc" });
const client = rpc.endlessLogin({ clientId });

client.then(() => {
  unloadables.push(
    // @ts-ignore
    intercept("playbackControls/TIME_UPDATE", ([current]: [number]) => {
      const state = store.getState();

      const { item: currentlyPlaying, type: mediaType }: CurrentMediaItem =
        currentMediaItem;

      // TODO: add video support
      if (mediaType !== "track") return;

      let albumArtURL = getMediaURLFromID(currentlyPlaying.album.cover);

      const date = new Date();
      const now = (date.getTime() / 1000) | 0;
      const remaining = date.setSeconds(
        date.getSeconds() + (currentlyPlaying.duration - current)
      );

      const paused = state.playbackControls.playbackState === "NOT_PLAYING";

      console.log("CHECK !!!!", currentlyPlaying); // ignore this

      const videoCover = currentlyPlaying.album.videoCover;

      rpc.setActivity({
        ...(paused
          ? {
              smallImageKey: "paused-icon",
              smallImageText: "Paused",
            }
          : {
              smallImageText: "CHEWAWI IS THE GOAT!",
              smallImageKey: "tidal-icon",
              startTimestamp: now,
              endTimestamp: remaining,
            }),
        details: formatLongString(currentlyPlaying.title),
        state: formatLongString(
          "by " + currentlyPlaying.artists.map((a) => a.name).join(", ")
        ),
        largeImageKey: videoCover
          ? `https://t-artwork.obelous.com/artwork/${videoCover}.gif`
          : albumArtURL,
        largeImageText: formatLongString(
          currentlyPlaying.album.title as string
        ),
        ...(currentlyPlaying.url
          ? {
              buttons: [
                {
                  label: "Play on TIDAL",
                  url: currentlyPlaying.url,
                },
              ],
            }
          : {}),
      });
    })
  );
});

export async function onUnload(): Promise<void> {
  const resolvedClient = await client;
  unloadables.forEach((u) => u());

  try {
    resolvedClient.clearActivity();
    resolvedClient.destroy();
  } catch {}
}
