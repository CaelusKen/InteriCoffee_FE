import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Utility function to transform the screenName
const transformScreenName = (pathname) => {
  if (!pathname) return [{ name: 'Home', path: '/' }];
  const segments = pathname.split('/').filter(Boolean); // Split and remove empty segments
  const breadcrumb = [{ name: 'Home', path: '/' }];
  let pathAccumulator = '';
  segments.forEach(segment => {
    pathAccumulator += `/${segment}`;
    let name = segment.charAt(0).toUpperCase() + segment.slice(1);
    if (name === 'Products') {
      name = 'Furniture Store';
    }
    breadcrumb.push({
      name,
      path: pathAccumulator
    });
  });
  return breadcrumb;
};

const Slug = () => {
  const router = useRouter();
  const breadcrumb = transformScreenName(router.pathname);

  if (breadcrumb.length === 1) {
    return null;
  }

  return (
    <div className="slug-ui text-white px-8">
      {breadcrumb.map((crumb, index) => (
        <span key={crumb.path}>
          <Link href={crumb.path} legacyBehavior>
            <a className='hover:underline'>{crumb.name}</a>
          </Link>
          {index < breadcrumb.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
};

Slug.propTypes = {
  screenName: PropTypes.string.isRequired,
};

export default Slug;