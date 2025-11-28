function getIsCrossDomain() {
  let isCrossDomain = false;
  try {
    isCrossDomain = !parent.location.search;
  } catch (e) {
    isCrossDomain = true;
  }
  return isCrossDomain;
}

export default function getEnv() {
  const params = new URLSearchParams(location.search);

  const isPreviewParam = params.get('env') === 'preview';
  if (isPreviewParam || getIsCrossDomain()) {
    return 'preview';
  }
}
