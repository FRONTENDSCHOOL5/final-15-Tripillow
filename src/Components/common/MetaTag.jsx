import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTag = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>

      <meta name='description' content={props.description} />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={props.title} />
      <meta property='og:site_name' content={props.title} />
      <meta property='og:description' content={props.description} />
      <meta property='og:url' content={props.url} />

      <meta name='twitter:title' content={props.title} />
      <meta name='twitter:description' content={props.description} />

      <link rel='canonical' href={props.url} />
    </Helmet>
  );
};

export default MetaTag;
