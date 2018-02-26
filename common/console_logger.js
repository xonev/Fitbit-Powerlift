export function build() {
  const extern = {};

  extern.error = console.error;
  extern.warn = console.warn;
  extern.info = console.log;
}