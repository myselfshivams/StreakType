// next.config.mjs
export default {
    async rewrites() {
      return [
        {
          source: '/api/stories',
          destination: 'https://stories.studex.tech/api/stories?random=true',
        },
      ];
    },
  };
  