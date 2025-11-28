<script>
  import AmpResize from '../AmpResize/AmpResize.svelte';
  import Image from '../Image/Image.svelte';

  const params = new URLSearchParams(location.search);
  const cmids = {
    small: params.get('small'),
    large: params.get('large')
  };
</script>

<AmpResize>
  <Image {cmids} />
</AmpResize>
