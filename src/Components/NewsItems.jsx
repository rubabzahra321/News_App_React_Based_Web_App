import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css'

const NewsItems = ({ title, description, imgUrl, url }) => {
 
  const truncateText = (text, maxWords) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const truncatedTitle = truncateText(title, 10);   
  const truncatedDescription = truncateText(description, 20); 

  return (
    <div className='my-3 w-100'>
      <Card className="h-100 d-flex flex-column news-card">
        <Card.Img
          variant="top"
          src={imgUrl || 'https://via.placeholder.com/150'}
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{truncatedTitle}</Card.Title>
          <Card.Text className="flex-grow-1">
            {truncatedDescription}
          </Card.Text>
          <Button href={url} target="_blank" variant="dark" size="sm">
            Read More
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

NewsItems.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
  url: PropTypes.string,
};

export default NewsItems;
