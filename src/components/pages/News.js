import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axios.get('https://newsdata.io/api/1/news', {
          params: {
            apikey: 'pub_81981862c08ba19d1a03bb36728e6acc5ac98',
            q: 'crypto',
            language: 'en',
            category: 'business',
          },
        });

        console.log(res.data.results)

        setArticles(res.data.results || []);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    };

    getNews();
  }, []);

  return (
    <div className="news-section">
      <h2>📰 Latest Crypto News</h2>
      {articles.length ? (
        articles.map((news, idx) => (
          <div key={idx} className="news-item">
            {news.image_url && <img src={news.image_url} alt="news" />}
            <div className="content">
              <h3>{news.title}</h3>
              <p>{news.description}</p>
              <a href={news.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default News;
