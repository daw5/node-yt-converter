import ytdl, { videoFormat } from '@distube/ytdl-core';
import { ConvertOptions } from '../types';

interface Options extends Omit<ConvertOptions, 'onDownloading' | 'directory' | 'title'>{}

export default async function createStreamVideo(options:Options) {
  const { url, itag } = options;

  const videoInfo = await ytdl.getInfo(url);

  let format : videoFormat;
  if (itag) { format = videoInfo.formats.find((fm) => fm.itag === itag); }

  return ytdl(url, {
    filter: 'videoandaudio',
    format: format || videoInfo.formats.find((fm) => fm.hasAudio && fm.hasVideo),
  });
}
