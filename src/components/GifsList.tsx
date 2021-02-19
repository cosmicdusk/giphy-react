import React from 'react';
import { Dimensions } from 'react-native';
import MasonryList from 'react-native-masonry-list';
import { styles } from './Styles';

interface GifsListProps {
  images: any[];
  onEndReached: () => void;
  onCallPressImage: (id:string) => void;
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

  onCallEndReach() {
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
      this.props.onEndReached();
    }
  };

  onCallPressImage (id:string)  {
    this.props.onCallPressImage(id);
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
        onEndReached={() => {
          this.onCallEndReach();
        }}
        onImagesResolveEnd={() => {
          console.log("resolved");
          this.setState({
            loading: false,
          });
        }}
        onPressImage={(item,index) => {
          console.log(item);
          this.onCallPressImage(item.id);
        }}
      />
    );
  }
}

export default GifsList;
