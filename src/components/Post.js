import React from "react";
import { Grid, Image, Text  } from "../elements/index";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Image shape="circle" src={props.src} />
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.inser_dt}</Text>
        </Grid>
        <Grid padding="16px">{props.contents}</Grid>
        <Grid>
          <Image shape="rectangle" src={props.src} />
        </Grid>
        <Grid padding="16px">
          <Text bold>댓글 {props.comments_cnt}개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "jonghoon",
    user_profile:
      "https://img.gqkorea.co.kr/gq/2020/05/style_5ecbc5f096041.jpg",
  },
  contents: "열공",
  image_url: " https://img.gqkorea.co.kr/gq/2020/05/style_5ecbc5f096041.jpg",
  comments_cnt: 10,
  inser_dt: "2021-11-29 10:00:00",
};
export default Post;
