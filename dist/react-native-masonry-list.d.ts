declare module 'react-native-masonry-list' {
  import * as React from 'react';

  export interface MasonryListProps {
    itemSource?: any[];
    images: any[];
    layoutDimensions?: object;
    containerWidth?: number;
    columns?: number;
    spacing?: number;
    initialColToRender?: number;
    initialNumInColsToRender?: number;
    sorted?: boolean;
    backgroundColor?: string;
    imageContainerStyle?: object;
    listContainerStyle?: object;
    renderIndividualHeader?: () => any | React.ReactNode;
    renderIndividualFooter?: () => any | React.ReactNode;
    masonryFlatListColProps?: object;
    rerender?: boolean;
    customImageComponent?: () => any | React.ReactNode;
    customImageProps?: object;
    completeCustomComponent?: () => any | React.ReactNode;
    onImageResolved?: () => any;
    onImagesResolveEnd?: () => any;
    onPressImage?: () => any;
    onLongPressImage?: () => any;
    onEndReached?: () => any;
    onEndReachedThreshold?: number;
    refreshing?: boolean;
    onRefresh?: () => any;
  }

  export default class MasonryList extends React.PureComponent<
    MasonryListProps,
    any
  > {}
}
