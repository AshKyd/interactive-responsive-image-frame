<script>
  import AmpResize from '../AmpResize/AmpResize.svelte';
  import { decode } from '../codec';
  import Image from '../Image/Image.svelte';

  const params = new URLSearchParams(location.search);
  const images = decode(params.get('images') || '');
</script>

<AmpResize>
  <Image {images} />
</AmpResize>
