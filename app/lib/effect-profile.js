export function getEffectProfile() {
  if (typeof window === "undefined") {
    return {
      reduceMotion: false,
      coarsePointer: false,
      constrained: false,
      cursor: false,
      shaderBlur: true,
      dpr: 1,
      shaderPixels: 2_000_000,
    };
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const saveData = Boolean(navigator.connection?.saveData);
  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  const constrained =
    reduceMotion ||
    saveData ||
    coarsePointer ||
    cores <= 4 ||
    memory <= 4;

  return {
    reduceMotion,
    coarsePointer,
    constrained,
    cursor: hasFinePointer && !reduceMotion && !saveData,
    shaderBlur: !constrained,
    dpr: Math.min(window.devicePixelRatio || 1, constrained ? 1 : 1.5),
    shaderPixels: constrained ? 480_000 : 1_600_000,
  };
}
