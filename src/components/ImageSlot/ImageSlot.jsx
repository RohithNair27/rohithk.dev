import { useEffect, useId, useRef, useState } from 'react';
import './ImageSlot.css';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];
const MAX_DIM = 1200;
const STORAGE_PREFIX = 'image-slot:';

/**
 * <ImageSlot> — a user-fillable image placeholder.
 *
 * Drop this into a layout wherever a design needs a photo the visitor (or
 * the site owner, editing in the browser) can fill in later. It sizes to
 * its container by default — give it a sized wrapper (a grid cell, a fixed
 * frame) or set width/height directly on it.
 *
 * The dropped image is downscaled through a canvas and persisted to
 * localStorage under its `id`, so it survives a reload on the same
 * browser. There's no backend here, so it's per-visitor, not shared —
 * good enough for a portfolio owner previewing their own site locally.
 *
 * Props:
 *   id           Persistence key. REQUIRED — every slot on the page needs
 *                a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   placeholder  Empty-state caption.                     (default 'Drop an image')
 *   src          Optional fallback image URL shown until the visitor drops
 *                their own — a user drop overrides it.
 *   editable     Whether hover controls (Replace/Clear) are shown.
 *                (default true)
 */
export default function ImageSlot({
  id,
  shape = 'rounded',
  radius = 12,
  placeholder = 'Drop an image',
  src,
  editable = true,
  className = '',
  style,
}) {
  const reactId = useId();
  const slotId = id || reactId;
  const storageKey = `${STORAGE_PREFIX}${slotId}`;

  const [stored, setStored] = useState(() => readStoredImage(storageKey));
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const dragDepth = useRef(0);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(t);
  }, [error]);

  const persist = (dataUrl) => {
    setStored(dataUrl);
    try {
      if (dataUrl) window.localStorage.setItem(storageKey, dataUrl);
      else window.localStorage.removeItem(storageKey);
    } catch {
      // Best-effort only — the in-memory state still reflects the change.
    }
  };

  const ingest = async (file) => {
    setError(null);
    if (!file || !ACCEPTED_TYPES.includes(file.type)) {
      setError('Drop a PNG, JPEG, WebP, or AVIF image.');
      return;
    }
    try {
      const dataUrl = await downscale(file, MAX_DIM);
      persist(dataUrl);
    } catch {
      setError('Could not read that image.');
    }
  };

  const openPicker = () => {
    if (!editable) return;
    inputRef.current?.click();
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    dragDepth.current += 1;
    setIsOver(true);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  const onDragLeave = () => {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setIsOver(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    dragDepth.current = 0;
    setIsOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) ingest(file);
  };

  const shown = stored || src || null;
  const classes = ['image-slot', `image-slot--${shape}`, className]
    .filter(Boolean)
    .join(' ');
  const slotStyle = shape === 'rounded' ? { ...style, '--is-radius': `${radius}px` } : style;

  return (
    <div
      className={classes}
      style={slotStyle}
      data-filled={shown ? '' : undefined}
      data-over={isOver ? '' : undefined}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {shown ? (
        <img className="image-slot__img" src={shown} alt="" draggable={false} />
      ) : (
        <button
          type="button"
          className="image-slot__empty"
          onClick={openPicker}
          aria-label={placeholder}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="image-slot__cap">{placeholder}</span>
          {editable && (
            <span className="image-slot__sub">
              or <u>browse files</u>
            </span>
          )}
        </button>
      )}

      {editable && shown && (
        <div className="image-slot__ctl">
          <button type="button" onClick={openPicker}>Replace</button>
          <button type="button" onClick={() => persist(null)}>Clear</button>
        </div>
      )}

      <div className="image-slot__ring" aria-hidden="true" />
      {error && <div className="image-slot__err">{error}</div>}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) ingest(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}

function readStoredImage(storageKey) {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    // localStorage unavailable (private mode, disabled) — read-only fallback.
    return null;
  }
}

/** Encode an image file through a canvas, capping its longest side at
 *  `maxDim`, so localStorage carries resized bytes rather than the raw
 *  upload. */
async function downscale(file, maxDim) {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
    return canvas.toDataURL('image/webp', 0.85);
  } finally {
    bitmap.close?.();
  }
}
