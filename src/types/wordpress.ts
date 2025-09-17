export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [key: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface WPFeaturedMedia {
  'wp:featuredmedia': WPMedia[];
}

export interface WPPage {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  _embedded?: WPFeaturedMedia;
}
