import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  fetchSuccess,
  fetchStart,
  fetchFailure,
  dislike,
  like,
} from "../redux/videoSlice";
import moment from "moment/moment";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const { currentVideo } = useSelector((state) => state.video);
  //console.log("current video is" ,currentVideo)
  console.log("current video is", currentVideo);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  console.log(path);
  const [channel, setChannel] = useState({});
  const timeago = moment(currentVideo?.createdAt).fromNow();

  useEffect(() => {
    dispatch(fetchStart());
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `http://localhost:8800/api/videos.routes/find/${path}`
        );
        console.log("result is", videoRes);
        const channelRes = await axios.get(
          `http://localhost:8800/api/user.routes/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        fetchFailure();
      }
    };
    fetchData();
  }, [path, dispatch]);

  // const handleLike = async () => {
  //   await axios.put(
  //     `http://localhost:8800/api/user.routes/like/${currentVideo?._id}`
  //   );
  //   dispatch(like(currentUser?.data?.user._id));
  // };

  const handleLike = async () => {
    const accessToken = currentUser?.data?.accessToken;

    if (accessToken) {
      await axios.put(
        `http://localhost:8800/api/user.routes/like/${currentVideo?._id}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    } else {
      console.error("No access token found");
    }
    dispatch(like(currentUser?.data?.user._id));
  };

  const handleDislike = async () => {
    const accessToken = currentUser?.data?.accessToken;

    if (accessToken) {
      await axios.put(
        `http://localhost:8800/api/user.routes/dislike/${currentVideo?._id}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    } else {
      console.error("No access token found");
    }
    dispatch(dislike(currentUser?.data?.user._id));
  };

  const handleSub = async () => {
    const accessToken = currentUser?.data?.accessToken;

    if (accessToken) {
      currentUser?.data.user.subscribedUsers.includes(channel?._id)
        ? await axios.put(
            `http://localhost:8800/api/user.routes/unsub/${channel?._id}`,
            {},
            { headers: { Authorization: `Bearer ${accessToken}` } }
          )
        : await axios.put(
            `http://localhost:8800/api/user.routes/sub/${channel?._id}`,
            {},
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
    } else {
      console.error("No access token found");
    }
    dispatch(subscription(channel._id));
  };

  //TODO: DELETE VIDEO FUNCTIONALITY

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src="https://www.youtube.com/embed/k3Vfj-e1Ma4" />
        </VideoWrapper>
        {currentVideo === null ? (
          <h1>Loading</h1>
        ) : (
          <Title>{currentVideo?.title}</Title>
        )}
        <Details>
          <Info>
            {currentVideo?.views} views • {timeago}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon />
              Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              {currentVideo === null ? (
                <h1>Loading</h1>
              ) : (
                <Description>{currentVideo.desc}</Description>
              )}
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        {currentVideo === null ? (
          <h1>Loading</h1>
        ) : (
          <Comments videoId={currentVideo._id} />
        )}
      </Content>
      {currentVideo === null ? (
        <h1>Loading</h1>
      ) : (
        <Recommendation tags={currentVideo.tags} />
      )}
    </Container>
  );
};

export default Video;
