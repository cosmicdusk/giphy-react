export interface GiphyItem {
    id: string,
    images: {
      original: {
        url: string;
      };
      fixed_width: {
        url: string;
      }
    };
    title: string;
    user?: {
      avatar_url: string;
      display_name: string;
      is_verified: boolean;
    };
}
