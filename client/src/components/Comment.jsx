import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  const timeago = moment(comment.createdAt).fromNow();

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`http://localhost:8800/api/user.routes/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar
        src={
          channel?.img ||
          "https://herrmans.eu/wp-content/uploads/2019/01/765-default-avatar.png"
        }
      />
      <Details>
        <Name>
          {channel?.name}
          <Date>{timeago}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  ); 
};

export default Comment;