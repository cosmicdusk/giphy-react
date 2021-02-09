import React from 'react';
import { Dimensions } from 'react-native';
import MasonryList from 'react-native-masonry-list';
import { styles } from './Styles';

interface GifsListProps {
  images: any[];
  onEndReached: () => void;
}

interface GifsListStates {
  loading: boolean;
}

class GifsList extends React.Component<GifsListProps, GifsListStates> {
  images: any[];

  constructor(props: GifsListProps) {
    super(props);
    this.images = props.images;
    this.state = {
      loading: true,
    };
  }

  _onCallEndReach = () => {
    if (!this.state.loading) {
      this.props.onEndReached;
      this.setState({
        loading: true,
      });
      this.props.onEndReached();
    }
  };

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
        onEndReached={() => {
          this._onCallEndReach();
        }}
        onImagesResolveEnd={() => {
          this.setState({
            loading: false,
          });
        }}
      />
    );
  }
}

export default GifsList;
