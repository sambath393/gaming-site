export const isDebug = () => process?.env?.NODE_ENV === 'development';

export const getDomain = () =>
  isDebug() ? 'http://localhost:3000' : process?.env?.NEXT_PUBLIC_API_URL;

export const getCMSDomain = () => (isDebug() ? '/' : process?.env?.NEXT_PUBLIC_CMS_URL);
