module.exports = ({ file, options, env }) => {
  return {
    plugins: {
      "postcss-preset-env": {},
      "postcss-url": {},
      "postcss-import": { root: file.dirname },
      "postcss-nested": {},
      "postcss-advanced-variables": {},
      "postcss-mixins": {},
      cssnano: {},
      "postcss-custom-media": {
        importFrom: [
          {
            customMedia: { "--m-sm": "(max-width: 374.98px)" },
          },
          {
            customMedia: { "--m": "(max-width: 575.98px)" },
          },
          {
            customMedia: { "--t-sm": "(max-width: 767.98px)" },
          },
          {
            customMedia: { "--t-lg": "(max-width: 991.98px)" },
          },
          {
            customMedia: { "--d-lg": "(max-width: 1199.98px)" },
          },
          {
            customMedia: {
              "--ie":
                "screen and (-ms-high-contrast: active), (-ms-high-contrast: none)",
            },
          },
        ],
      },
    },
  };
};
