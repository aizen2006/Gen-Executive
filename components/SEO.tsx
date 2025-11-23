import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'GenExecutive | AI Agents & Executive Operations Studio',
  description = 'Executive-level support, powered by AI agents. We build custom AI agents, chatbots, and landing pages while handling your admin needs.',
  image = 'https://www.genexecutive.com/og-image.jpg', // Placeholder: user should update
  url = 'https://www.genexecutive.com',
  keywords = 'AI agents, executive support, operations automation, AI chatbots, virtual assistant, business automation'
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GenExecutive",
    "url": url,
    "logo": image,
    "description": description,
    "sameAs": [
      "https://twitter.com/genexecutive",
      "https://linkedin.com/company/genexecutive"
    ]
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
