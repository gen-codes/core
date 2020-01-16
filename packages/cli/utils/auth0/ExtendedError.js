export default class ExtendedError extends Error {
  constructor(message, inner) {
      super(message);
      this.inner = inner;
  }
}
