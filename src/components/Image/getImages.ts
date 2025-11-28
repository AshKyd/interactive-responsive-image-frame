import { fetchOne } from '@abcnews/terminus-fetch';
import { TIERS } from '@abcnews/env-utils';
import getEnv from './getEnv';

let cache = {};

export default async function getImage(rendition, cmids = { small: '', large: '' }) {
  const mobile = cmids.small;
  const desktop = cmids.large;
  const env = getEnv();

  if (!mobile || !desktop) {
    throw new Error('Missing mobile or desktop IDs');
  }

  if (cache[rendition]) {
    // Hack: wait a moment to resolve ResizeObserver throw
    await new Promise(resolve => setTimeout(resolve, 1));
    return cache[rendition];
  }

  const promise = await fetchOne({
    id: rendition === 'mobile' ? mobile : desktop,
    force: env === 'preview' ? TIERS.PREVIEW : TIERS.LIVE,
    type: 'image'
  }).then(doc => {
    // This is not a TerminusDocument, despite what the API says
    const _doc = doc as any;
    if (!_doc.media) {
      throw new Error('Image has no media');
    }
    return _doc;
  });

  cache[rendition] = promise;
  return promise;
}
