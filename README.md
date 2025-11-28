# interactive-responsive-image-frame

A fairly naive, art-directed responsive image solution using embedded iframes.

## Overview

**This is a stop-gap until our CMS can support art directed responsive images.**

This is a fully Javascript solution, and doesn't use any native features like the `<picture>` element. On load, it queries the iframe size and fetches the relevant image document from Terminus, then uses the original image rendition for display. Therefore, please ensure your images are appropriately compressed before uploading.

## Usage

Embed this iframe with two ContentIDs, one for small screens, and one for large screens:

```
/?abcnewsembedheight=600&small=106077488&large=106077486
```

For development, specify an env with `&env=preview`
