/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2022-11-23 18:19:48
 * @LastEditTime: 2022-11-23 18:47:22
 * @LastEditors: dingyuwen
 * @Description:
 */
import { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import classnames from "classnames";
import { connect } from "../../../../utils/connect";
import CLoading from "../../../../components/CLoading";
import CMusic from "../../../../components/CMusic";
import {
  getSongInfo,
  getPlayListDetail,
  updatePlayStatus
} from "../../../../actions/song";
import { getDjListDetail } from "../../../../actions/dj";
// import { injectPlaySong } from "../../utils/decorators";
import { formatCount } from "../../../../utils/common";
import { songType, djListType } from "../../../../constants/commonType";
import "./index.scss";

type PageStateProps = {
  song: songType;
  dj: djListType;
};

type PageDispatchProps = {
  getPlayListDetail: (object) => any;
  getSongInfo: (object) => any;
  updatePlayStatus: (object) => any;
  getDjListDetail: (object) => any;
};

type PageState = {};

// @injectPlaySong()
@connect(
  ({ song, dj }) => ({
    song: song,
    dj: dj
  }),
  dispatch => ({
    getPlayListDetail(payload) {
      dispatch(getPlayListDetail(payload));
    },
    getSongInfo(object) {
      dispatch(getSongInfo(object));
    },
    updatePlayStatus(object) {
      dispatch(updatePlayStatus(object));
    },
    getDjListDetail(object) {
      dispatch(getDjListDetail(object));
    }
  })
)
class Page extends Component<PageDispatchProps & PageStateProps, PageState> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount() {
    const { id, name = "" } = getCurrentInstance()?.router?.params || {};
    Taro.setNavigationBarTitle({
      title: name
    });
    this.props.getDjListDetail({
      id
    });
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  playSong(songId, playStatus) {
    if (playStatus === 0) {
      Taro.navigateTo({
        url: `/pages/packageA/pages/songDetail/index?id=${songId}`
      });
    } else {
      Taro.showToast({
        title: "????????????",
        icon: "none"
      });
    }
  }

  render() {
    const {
      playListDetailInfo,
      playListDetailPrivileges,
      currentSongInfo,
      isPlaying,
      canPlayList
    } = this.props.song;
    return (
      <View
        className={classnames({
          playList_container: true,
          hasMusicBox: !!currentSongInfo.name
        })}
      >
        <CMusic
          songInfo={{
            currentSongInfo,
            isPlaying,
            canPlayList
          }}
          onUpdatePlayStatus={this.props.updatePlayStatus.bind(this)}
        />
        <View className="playList__header">
          <Image
            className="playList__header__bg"
            src={playListDetailInfo.coverImgUrl}
          />
          <View className="playList__header__cover">
            <Image
              className="playList__header__cover__img"
              src={playListDetailInfo.coverImgUrl}
            />
            <Text className="playList__header__cover__desc">??????</Text>
            <View className="playList__header__cover__num">
              <Text className="at-icon at-icon-sound"></Text>
              {formatCount(playListDetailInfo.playCount)}
            </View>
          </View>
          <View className="playList__header__info">
            <View className="playList__header__info__title">
              {playListDetailInfo.name}
            </View>
            <View className="playList__header__info__user">
              <Image
                className="playList__header__info__user_avatar"
                src={playListDetailInfo.creator.avatarUrl}
              />
              {playListDetailInfo.creator.nickname}
            </View>
          </View>
        </View>
        <View className="playList__header--more">
          <View className="playList__header--more__tag">
            ?????????
            {playListDetailInfo.tags.map(tag => (
              <Text key={tag} className="playList__header--more__tag__item">
                {tag}
              </Text>
            ))}
            {playListDetailInfo.tags.length === 0 ? "??????" : ""}
          </View>
          <View className="playList__header--more__desc">
            ?????????{playListDetailInfo.description || "??????"}
          </View>
        </View>
        <View className="playList__content">
          <View className="playList__content__title">????????????</View>
          {playListDetailInfo.tracks.length === 0 ? <CLoading /> : ""}
          <View className="playList__content__list">
            {playListDetailInfo.tracks.map((track, index) => (
              <View
                className={classnames({
                  playList__content__list__item: true,
                  disabled: playListDetailPrivileges[index].st === -200
                })}
                key={track.id}
                onClick={this.playSong.bind(
                  this,
                  track.id,
                  playListDetailPrivileges[index].st
                )}
              >
                <Text className="playList__content__list__item__index">
                  {index + 1}
                </Text>
                <View className="playList__content__list__item__info">
                  <View>
                    <View className="playList__content__list__item__info__name">
                      {track.name}
                    </View>
                    <View className="playList__content__list__item__info__desc">
                      {track.ar[0] ? track.ar[0].name : ""} - {track.al.name}
                    </View>
                  </View>
                  <Text className="at-icon at-icon-chevron-right"></Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

// #region ????????????
//
// ?????????????????????????????????????????? Taro.Component ?????????????????????????????? props ??????
// ?????????????????????????????? Ts ????????????????????? JSX ??????????????????
//
// #endregion

export default Page;
