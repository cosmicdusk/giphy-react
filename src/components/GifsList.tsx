import React from 'react';
import { Dimensions } from 'react-native';
import MasonryList from 'react-native-masonry-list';
import { styles } from './Styles';

interface GifsListProps {
  images: any[]; // <---- What is the type of `images`? Why are we using `any`?
  onEndReached: () => void;
}

interface GifsListStates {
  loading: boolean;
}

class GifsList extends React.Component<GifsListProps, GifsListStates> {
  images: any[]; // <--- Why is this still defined? It doesn't do anything.

  constructor(props: GifsListProps) {
    super(props);
    this.images = props.images;
    this.state = {
      loading: true,
    };
  }

  // Instead of prefixing your private methods with underscore, try declaring
  // the `private` TypeScript keywords. If you define it like this, other people
  // can still access it using `gifList._onCallEndReach()`.
  //
  // private onCallEndReach = () => {}

  _onCallEndReach = () => {
    if (!this.state.loading) {
      this.props.onEndReached; // <--- What does this line do?
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
        // If a function calls another directly supplying the same parameters
        // (empty in this case), and it does not call any other method, you can
        // pass it directly as a property.
        //
        // onEndReached={this._onCallEndReach}
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
