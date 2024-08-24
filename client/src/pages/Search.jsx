import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:8800/api/videos.routes/search${query}`);
      console.log("search data", res.data)
      setVideos(res.data.statusCode);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => (
            <Card key={video._id} video={video}/>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </Container>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;