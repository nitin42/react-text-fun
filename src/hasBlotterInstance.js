export const hasBlotterInstance = () => {
  if (typeof window !== undefined && window.Blotter === undefined) {
    throw Error(`
              Couldn't find a Blotter.js script. Place this script in your HTML file to instantiate Blotter module and WebGL context.
          `);
  }
};
