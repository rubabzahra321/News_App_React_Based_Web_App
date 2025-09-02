import React, { useState, useEffect } from 'react';
import NewsItems from './NewsItems';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Spinner from './Spinner';

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const fetchNews = async (pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.REACT_APP_GNEWS_API_KEY; 
      let url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=${apiKey}&page=${pageNum}&max=${props.pageSize}`;
      
      let response = await fetch(url);
      let data = await response.json();

      if (data.errors) {
        setError(data.errors[0].message);
        setLoading(false);
        return;
      }

      setArticle(data.articles || []);
      setTotalResults(
        data.totalResults || (data.articles ? data.articles.length : 0)
      );
      setPage(pageNum);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Run when component mounts OR category changes
  useEffect(() => {
    fetchNews(1);
  }, [props.category]);

  const handlePreviousClick = async () => {
    if (page > 1) {
      await fetchNews(page - 1);
    }
  };

  const handleNextClick = async () => {
    if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
      await fetchNews(page + 1);
    }
  };

  return (
    <div className="container my-3">
      <h2 className="text-center">Headline Horizon - Top Headlines</h2>
      {loading && <Spinner />}
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row">
        {!loading &&
          !error &&
          article.map((val) => (
            <div
              className="col-12 col-sm-6 col-md-4 mb-4 d-flex"
              key={val.url}
            >
              <NewsItems
                title={val.title || ''}
                description={val.description || ''}
                imgUrl={val.image || ''}
                url={val.url}
              />
            </div>
          ))}
      </div>
      <div className="container my-5">
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Button
              disabled={page <= 1}
              variant="dark"
              onClick={handlePreviousClick}
            >
              &larr; Previous
            </Button>
          </div>
          <div className="p-2 ms-auto"></div>
          <div className="p-2">
            <Button
              disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
              variant="dark"
              onClick={handleNextClick}
            >
              Next &rarr;
            </Button>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default News;
