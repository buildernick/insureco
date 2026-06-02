import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-react';
import builderComponents from '../components/builder/builderComponents';

const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;

export default function BuilderPage() {
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    fetchOneEntry({
      model: 'page',
      apiKey: BUILDER_API_KEY,
      userAttributes: { urlPath: location.pathname },
    }).then((entry) => {
      if (entry || isPreviewing()) {
        setContent(entry);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [location.pathname]);

  if (loading) return null;

  if (notFound) {
    return (
      <div className="builder-not-found">
        <h1>404 — Page Not Found</h1>
        <p>No page exists at this URL.</p>
      </div>
    );
  }

  return (
    <Content
      model="page"
      apiKey={BUILDER_API_KEY}
      content={content}
      customComponents={builderComponents}
    />
  );
}
