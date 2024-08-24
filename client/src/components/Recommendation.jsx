import React from 'react'
import styled from 'styled-components';
import {useEffect,useState} from "react"
import Card from '../components/Card.jsx'
import axios from 'axios';

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({tags}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
      const fetchVideos = async () => {
        const res = await axios.get(`http://localhost:8800/api/videos.routes/tags?tags=${tags}`);
        console.log("fetch videos check", res.data);
        setVideos(res.data.statusCode);
      };
      fetchVideos();
    }, [tags]);
    return (
        <Container>
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => (
            <Card key={video._id} video={video} type="sm" />
          ))
        ) : (
          <p>No videos available</p>
        )}
      </Container>
      
    );
};

export default Recommendation