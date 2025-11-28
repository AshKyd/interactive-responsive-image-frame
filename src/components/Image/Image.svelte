<script lang="ts">
  import getImages, { type FetchedRenditions } from './getImages';
  let { images } = $props();
  let embedWidth = $state(window.innerWidth);
  let renditions = $state<FetchedRenditions[]>([]);
  let defaultRendition = $derived.by(() => renditions[0]);
  let error = $state('');

  const defaultMediaQueries = {
    mobile: '(max-width: 607px)',
    desktop: '(min-width: 680px)'
  };

  $effect(() => {
    error = '';
    getImages(images)
      .then(images => {
        renditions = images;
      })
      .catch(e => {
        error = e.message;
      });
  });
</script>

<div bind:clientWidth={embedWidth}>
  {#if error}
    <div data-debug={error}>Could not load image</div>
  {/if}
  {#if renditions?.length}
    <picture>
      {#each renditions as rendition}
        <source
          srcset={rendition.image.url}
          media={rendition.breakpoint === 'custom' ? rendition.mediaQuery : defaultMediaQueries[rendition.breakpoint]}
        />
      {/each}
      {#if defaultRendition}
        <img
          alt={defaultRendition.image.alt}
          src={defaultRendition.image.url}
          loading="lazy"
          decoding="async"
          width={defaultRendition.image.width}
          height={defaultRendition.image.height}
        />
      {/if}
    </picture>
  {/if}
</div>

<style lang="scss">
  :global {
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  }
  img {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
