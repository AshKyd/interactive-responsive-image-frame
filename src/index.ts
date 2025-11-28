import acto from '@abcnews/alternating-case-to-object';
import { whenDOMReady } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { Mount } from '@abcnews/mount-utils';
import App from './components/App/App.svelte';
import { mount } from 'svelte';

let appMountEl: Mount;
let appProps;

whenDOMReady.then(async () => {
  const [builderMountEl] = selectMounts('interactiveresponsivebuilder');
  if (builderMountEl) {
    const builder = await import('./components/Builder/Builder.svelte');
    mount(builder.default, {
      target: builderMountEl
    });
    return;
  }

  [appMountEl] = selectMounts('interactiveresponsiveiframe');
  if (appMountEl) {
    appProps = acto(getMountValue(appMountEl));
    mount(App, {
      target: appMountEl,
      props: appProps
    });
  }
});
if (process.env.NODE_ENV === 'development') {
  console.debug(`[interactive-responsive-image-frame] public path: ${__webpack_public_path__}`);
}
