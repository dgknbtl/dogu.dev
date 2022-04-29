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
            customMedia: { "--m-sm": "(max-width: 375px)" },
          },
          {
            customMedia: { "--m": "(max-width: 576px)" },
          },
          {
            customMedia: { "--t-sm": "(max-width: 768px)" },
          },
          {
            customMedia: { "--t-lg": "(max-width: 992px)" },
          },
          {
            customMedia: { "--d-lg": "(max-width: 1200px)" },
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
