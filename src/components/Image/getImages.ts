import { fetchOne } from '@abcnews/terminus-fetch';
import { TIERS } from '@abcnews/env-utils';
import getEnv from './getEnv';

type TerminusImage = {
  width: number;
  height: number;
  url: string;
  alt: string;
};

export type ImageRendition = { id: string; breakpoint: string; mediaQuery: string };

export type FetchedRenditions = ImageRendition & {
  image: TerminusImage;
};

export async function fetchImage(id = '') {
  const env = getEnv();

  if (!id.match(/^\d+/) || id === '0') {
    throw new Error('Invalid CMID');
  }

  return fetchOne({
    id,
    force: env === 'preview' ? TIERS.PREVIEW : TIERS.LIVE,
    type: 'image'
  }).then(doc => {
    // This is not a TerminusDocument, despite what the API says
    const _doc = doc as any;
    if (!_doc.media) {
      throw new Error('Image has no media');
    }

    const { cropWidth, cropHeight, url } = _doc.media?.image?.primary?.complete?.[0] || {};
    if (!url) {
      throw new Error('Unexpected payload');
    }
    return { width: cropWidth, height: cropHeight, url, alt: _doc.alt } as TerminusImage;
  });
}

export default async function getImages(images: ImageRendition[]): Promise<FetchedRenditions[]> {
  return Promise.all(
    images.map(async image => {
      const terminusImage = await fetchImage(image.id);
      const payload = { ...image, image: terminusImage };
      return payload;
    })
  );
}
