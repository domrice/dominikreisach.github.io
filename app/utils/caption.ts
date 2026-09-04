// A credit floats on its media, revealed on hover where hover exists. Which edge
// it clings to depends on what else lives there: a still has nothing, so the
// credit takes the bottom, closest to the reading direction. A <video> draws its
// native control bar along that same bottom edge — and since touch has no hover,
// the scrim there was permanent and the progress bar unreachable — so a video
// credit takes the top instead and leaves the chrome its own edge.
const captionBase =
  "absolute inset-x-0 p-4 text-center uppercase tracking-widest text-xs text-white transition-opacity duration-300 [@media(hover:hover)]:opacity-0 group-hover:opacity-100";

export const captionClass = (src: string) =>
  isVideo(src)
    ? `${captionBase} top-0 rounded-t-md bg-linear-to-b from-black/85 via-black/45 to-transparent`
    : `${captionBase} bottom-0 rounded-b-md bg-linear-to-t from-black/85 via-black/45 to-transparent`;

export const isVideo = (src: string) => src.endsWith(".webm");
