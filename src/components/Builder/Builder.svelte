<script lang="ts">
  import { BuilderStyleRoot, BuilderFrame, UpdateChecker } from '@abcnews/components-builder';
  import { PencilSquare, PlusLg, Trash } from 'svelte-bootstrap-icons';
  import { decode, encode } from '../codec';
  import EditModal from './EditModal.svelte';
  import type { ImageRendition } from '../Image/getImages';
  import Image from '../Image/Image.svelte';
  let modal = $state<ImageRendition>();

  const searchParamsEncoded = new URLSearchParams(window.location.hash.slice(1)).get('images');
  const defaultParams = encode([
    { id: '106077488', breakpoint: 'mobile', mediaQuery: '' },
    { id: '106077486', breakpoint: 'desktop', mediaQuery: '' }
  ]);

  let images = $state<ImageRendition[]>(decode(searchParamsEncoded || defaultParams));

  $effect(() => {
    const params = new URLSearchParams();
    params.append('images', encode(images));
    window.location.hash = String(params);
  });
</script>

{#snippet Viz()}
  <div class="viz">
    <div class="desktop">
      <div class="desktop__bar">
        <div class="desktop__buttons">
          <div class="desktop__b desktop__b1"></div>
          <div class="desktop__b desktop__b2"></div>
          <div class="desktop__b desktop__b3"></div>
        </div>
        <div class="desktop__title">Desktop</div>
      </div>

      <Image {images} />
    </div>

    <div class="mobile">
      <div class="mobile__floater">
        <Image {images} />
      </div>
    </div>
  </div>
{/snippet}

{#snippet Sidebar()}
  {#if modal}
    <EditModal
      onClose={() => {
        modal = undefined;
      }}
      bind:image={modal}
    />
  {/if}
  <fieldset>
    <legend>
      <button
        class="btn-icon"
        onclick={() => {
          images = [
            ...images,
            {
              id: '',
              breakpoint: 'desktop',
              mediaQuery: ''
            }
          ];
        }}><PlusLg /></button
      > Images
    </legend>
    <table class="builder__table">
      <thead><tr><th>rendition</th><th>id</th><th>Edit</th></tr></thead>
      <tbody>
        {#each images as image, index}
          <tr>
            <td>{image.breakpoint}</td>
            <td>{image.id}</td>
            <td>
              <button
                onclick={() => {
                  modal = image;
                }}
              >
                <PencilSquare />
              </button>
              <button
                onclick={() => {
                  images = images.filter((img, i) => i !== index);
                }}
              >
                <Trash />
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </fieldset>
  <fieldset>
    <legend>Iframe URL</legend>
    <div>Copy this into your External Link document</div>
    <br />
    <input
      value="{window.location.origin}{window.location.pathname.replace('builder/', '')}?images={encodeURIComponent(
        encode(images)
      )}&abcnewsembedheight=0"
      disabled={true}
    />
  </fieldset>
{/snippet}

<BuilderStyleRoot>
  <BuilderFrame {Viz} {Sidebar} />
</BuilderStyleRoot>
<UpdateChecker buttonText="Open new builder" />

<style lang="scss">
  .viz {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 20px;
    @media (min-width: 1400px) {
      flex-direction: row;
      justify-content: space-around;
    }
  }
  .desktop,
  .mobile {
    padding: 10px;
    background: black;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .desktop {
    width: 680px;
    border-radius: 10px;
    &__bar {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    &__title {
      flex: 1;
      text-align: center;
      translate: -29px;
    }
    &__buttons {
      display: flex;
      gap: 5px;
    }
    &__b {
      border-radius: 1000px;
      width: 16px;
      height: 16px;
    }
    &__b1 {
      background: #ff5f57;
    }
    &__b2 {
      background: #febc2e;
    }
    &__b3 {
      background: #28c840;
    }
  }
  .mobile {
    width: 320px;
    border-radius: 32px;
    aspect-ratio: 9/19.5;
    display: flex;
    position: relative;

    &__floater {
      position: absolute;
      left: 10px;
      top: 20px;
      width: calc(100% - 20px);
      height: calc(100% - 40px);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: auto;
    }
  }
</style>
