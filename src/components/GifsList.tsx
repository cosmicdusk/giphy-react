import React from 'react';
import { Dimensions } from 'react-native';
import MasonryList, { MasonryListItem } from 'react-native-masonry-list';
import { styles } from './Styles';

interface GifsListProps {
  images: MasonryListItem[];
  onEndReached: () => void;
  onCallPressImage: (index: number) => void;
}

interface GifsListStates {
  loading: boolean;
}

class GifsList extends React.Component<GifsListProps, GifsListStates> {
  constructor(props: GifsListProps) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  onCallEndReach() {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
      this.props.onEndReached();
    }
  }

  onCallPressImage(index: number) {
    this.props.onCallPressImage(index);
  }
  render() {
    return (
      <MasonryList
        imageContainerStyle={styles.imageContainerStyle}
        listContainerStyle={styles.listContainerStyle}
        backgroundColor={'black'}
        rerender={false}
        images={this.props.images}
        columns={2}
        containerWidth={Dimensions.get('window').width}
        onEndReachedThreshold={0.5}
        onEndReached={this.onCallEndReach.bind(this)}
        onImagesResolveEnd={() => {
          this.setState({
            loading: false,
          });
        }}
        sorted={true}
        onPressImage={(item, index) => {
          this.onCallPressImage(index);
        }}
      />
    );
  }
}

export default GifsList;
