const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/blogs/:id', destination: '/', permanent: true },
      {
        source: '/admin/addProduct',
        destination: '/admin/new',
        permanent: true,
      },
      { source: '/admin/blogList', destination: '/admin', permanent: true },
      {
        source: '/admin/subscriptions',
        destination: '/admin',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
