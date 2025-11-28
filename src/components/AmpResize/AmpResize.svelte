<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();

  let height = $state(0);

  /**
   * Emits a message to the parent window to resize the iframe
   * @param height
   * @returns void
   */
  export const emitResize = (height: number) => {
    if (!window.parent) {
      return;
    }

    window.parent.postMessage(
      {
        type: 'embed-size',
        height
      },
      '*'
    );
  };

  $effect(() => {
    if (height > 0) {
      emitResize(height);
    }
  });
</script>

<div class="root" bind:clientHeight={height}>
  {@render children()}
</div>
