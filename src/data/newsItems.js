import newsData from './newsItems.json';

// Convert string icons to JSX elements
const newsItems = newsData.newsItems.map(item => ({
  ...item,
  icon: <span className="tossface">{item.icon}</span>
}));

export default newsItems; 