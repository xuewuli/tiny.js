const UTF8_ACCEPT = 12;
const UTF8_REJECT = 0;
const UTF8_DATA = [
  // The first part of the table maps bytes to character to a transition.
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  4,
  4,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  6,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  8,
  7,
  7,
  10,
  9,
  9,
  9,
  11,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,

  // The second part of the table maps a state to a new state when adding a
  // transition.
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  12,
  0,
  0,
  0,
  0,
  24,
  36,
  48,
  60,
  72,
  84,
  96,
  0,
  12,
  12,
  12,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  24,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  48,
  48,
  48,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  48,
  48,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  48,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,

  // The third part maps the current transition to a mask that needs to apply
  // to the byte.
  127,
  63,
  63,
  63,
  0,
  31,
  15,
  15,
  15,
  7,
  7,
  7
];

const HEX = [
  /* 0 - 9 */ 255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  /* 10 - 19 */ 255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  /* 20 - 29 */ 255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  /* 30 - 39 */ 255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  /* 40 - 49 */ 255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  0,
  1,
  /* 50 - 59 */ 2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  255,
  255,
  /* 60 - 69 */ 255,
  255,
  255,
  255,
  255,
  10,
  11,
  12,
  13,
  14,
  /* 70 - 79 */ 15,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  /* 80 - 89 */ 255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  /* 90 - 99 */ 255,
  255,
  255,
  255,
  255,
  255,
  255,
  10,
  11,
  12,
  /* 100 - 109 */ 13,
  14,
  15
];

const hexCodeToInt = (c, shift) => {
  const i = HEX[c];
  return i === void 0 ? 255 : i << shift;
};

const decodeURIComponent = (uri) => {
  let percentPosition = uri.indexOf('%');
  if (percentPosition === -1) return uri;

  const { length } = uri;
  let decoded = 255;
  let last = 0;
  let codepoint = 0;
  let startOfOctets = percentPosition;
  let state = UTF8_ACCEPT;

  while (percentPosition > -1 && percentPosition < length) {
    const high = hexCodeToInt(uri[percentPosition + 1], 4);
    const low = hexCodeToInt(uri[percentPosition + 2], 0);
    const byte = high | low;
    const type = UTF8_DATA[byte];
    state = UTF8_DATA[256 + state + type];
    codepoint = (codepoint << 6) | (byte & UTF8_DATA[364 + type]);

    if (state === UTF8_ACCEPT) {
      decoded += uri.slice(last, startOfOctets);

      decoded +=
        codepoint <= 0xffff
          ? String.fromCharCode(codepoint)
          : String.fromCharCode(0xd7c0 + (codepoint >> 10), 0xdc00 + (codepoint & 0x3ff));

      codepoint = 0;
      last = percentPosition + 3;
      startOfOctets = uri.indexOf('%', last);
      percentPosition = startOfOctets;
    } else if (state === UTF8_REJECT) {
      return null;
    } else {
      percentPosition += 3;
      if (percentPosition >= length || uri.charCodeAt(percentPosition) === 37) {
        return null;
      }
    }
  }

  return decoded + uri.slice(last);
};

module.exports = decodeURIComponent;
