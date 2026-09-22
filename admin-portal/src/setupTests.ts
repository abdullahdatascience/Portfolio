// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Firebase Auth v10 pulls in `undici`, which requires a global TextEncoder /
// TextDecoder. Node's jsdom test environment does not expose them by default.
import { TextDecoder, TextEncoder } from "util";
import { ReadableStream } from "stream/web";

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
// Firebase Auth v10 bundles undici, which references ReadableStream at module
// load time. jsdom (jest-environment-jsdom) does not expose it globally.
if (!globalThis.ReadableStream) {
  globalThis.ReadableStream = ReadableStream as typeof globalThis.ReadableStream;
}