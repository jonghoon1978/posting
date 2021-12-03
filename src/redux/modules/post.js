import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";

import { actionCreators as imageActions } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  list: [],
};

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "jonghoon",
  //   user_profile:
  //     "https://img.gqkorea.co.kr/gq/2020/05/style_5ecbc5f096041.jpg",
  // },
  contents: "열공",
  image_url: " https://img.gqkorea.co.kr/gq/2020/05/style_5ecbc5f096041.jpg",
  comments_cnt: 0,
  inser_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const addPostFB = (contents) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialState,
      contents: contents,
      inser_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    const _image = getState().image.preview;
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _image.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.uploadImage(url));
            })
            .catch((err) => {
              	window.alert("앗! 포스트 작성에 문제가 있어요!");
              console.log("post 작성에 실패했어요~", err);
            });
        })
      })
        .catch((err) => {
								window.alert("앗! 이미지 업로드에 문제가 있어요!");
        console.log(err);
        });
   };
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB.get().then((docs) => {
      let post_list = [];

      docs.forEach((doc) => {
        let _post = doc.data();

        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }

            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );

        post_list.push(post);

        // console.log(doc.id, doc.data());

        //   let _post = {
        //     id: doc.id,
        //     ...doc.data(),
        //   };
        //   let post = {
        //     id: doc.id,
        //     user_info: {
        //       user_name: _post.user_name,
        //       user_profile: _post.user_profile,
        //       user_id: _post.user_id,
        //     },
        //     contents: _post.contents,
        //     image_url: _post.image_url,
        //     comments_cnt: _post.comments_cnt,
        //     inser_dt: _post.inser_dt,
        //   };

        //   post_list.push(post);
      });

      console.log(post_list);
      dispatch(setPost(post_list));
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
};

export { actionCreators };
