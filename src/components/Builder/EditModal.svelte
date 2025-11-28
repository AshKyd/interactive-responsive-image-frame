<script lang="ts">
  import { Modal } from '@abcnews/components-builder';
  import type { ImageRendition } from '../Image/getImages';
  import type { MouseEventHandler } from 'svelte/elements';

  let {
    image = $bindable<ImageRendition>(),
    onClose
  }: { image: ImageRendition; onClose: MouseEventHandler<HTMLButtonElement> } = $props();

  const presets = ['mobile', 'desktop', 'custom'];
</script>

{#snippet footerChildren()}
  <button onclick={onClose}>Ok</button>
{/snippet}

<Modal title="Edit image" {footerChildren} {onClose}>
  <div class="builder__inline">
    <label class="builder__inline">
      ID
      <input type="text" bind:value={image.id} style="flex:1" />
    </label>
    <div>
      <select bind:value={image.breakpoint}>
        {#each presets as preset}
          <option selected={image.breakpoint === preset}>{preset}</option>
        {/each}
      </select>
    </div>
  </div>

  {#if image.breakpoint === 'custom'}
    <br />
    <fieldset>
      <legend>Custom breakpoint</legend>
      <div>
        <label class="builder__inline">
          Media query: <br />
          <input type="text" bind:value={image.mediaQuery} />
        </label>
      </div>
    </fieldset>
  {/if}
</Modal>

<div class="breakpoint"></div>

<style lang="scss">
  .breakpoint {
    display: flex;
    gap: 5px;
  }
  select {
    max-width: 6em;
  }
</style>
