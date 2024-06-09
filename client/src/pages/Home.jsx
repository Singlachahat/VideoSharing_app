import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card.jsx";
import axios from "axios"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos,setVideos]= useState([])
  useEffect(()=>{
    const fetchVideos= async()=>{
      try {
        const res=await axios.get((`http://localhost:8800/api/videos.routes/${type}`)) 
        setVideos(res.data.statusCode)
        console.log("API response ",res)
      } catch (error) {
        console.error("Error fetching videos:" , error)
      }
    }
    fetchVideos()
  },[type]);
 
  return (
    <Container>
    {videos.map((video) => (
      <Card key={video._id} video={video}/>
    ))}
  </Container>
  );
};           

export default Home;