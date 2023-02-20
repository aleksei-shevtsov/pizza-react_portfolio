import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={600}
    viewBox="0 0 280 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="137" cy="124" r="123" />
    <rect x="0" y="270" rx="5" ry="5" width="280" height="22" />
    <rect x="0" y="315" rx="5" ry="5" width="280" height="85" />
    <rect x="0" y="425" rx="5" ry="5" width="95" height="39" />
    <rect x="126" y="420" rx="25" ry="25" width="155" height="49" />
  </ContentLoader>
);

export default MyLoader;
