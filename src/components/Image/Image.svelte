<script lang="ts">
  import getImage from './getImages';
  let { cmids } = $props();
  let embedWidth = $state(window.innerWidth);
  let rendition = $derived.by(() => (embedWidth < 608 ? 'mobile' : 'desktop'));
  let doc = $state({ width: 0, height: 0, url: '', alt: '' });
  let error = $state('');

  $effect(() => {
    error = '';
    getImage(rendition, cmids)
      .then(got => {
        const { cropWidth, cropHeight, url } = got.media?.image?.primary?.complete?.[0] || {};
        if (!url) {
          throw new Error('Unexpected payload');
        }
        doc = { width: cropWidth, height: cropHeight, url, alt: got.alt };
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
  {#if doc.url}
    <img src={doc.url} width={doc.width} height={doc.height} loading="lazy" decoding="async" alt={doc.alt} />
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
