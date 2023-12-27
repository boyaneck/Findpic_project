export interface PhotoData {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  urls: Urls;
  links: PhotoLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any | null;
  topic_submissions: TopicSubmissions;
  user: User;
  exif: Exif;
  location: Location | null;
  meta: Meta;
  public_domain: boolean;
  tags: Tag[];
  tags_preview: TagPreview[];
  views: number;
  downloads: number;
  topics: Topic[];
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface PhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface TopicSubmissions {
  nature?: NatureTopicSubmission;
  wallpapers?: WallpapersTopicSubmission;
}

export interface NatureTopicSubmission {
  status: string;
  approved_on: string;
}

export interface WallpapersTopicSubmission {
  status: string;
}

export interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string | null;
  twitter_username: string | null;
  portfolio_url: string | null;
  bio: string;
  location: string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: string;
  portfolio_url: string | null;
  twitter_username: string;
  paypal_email: string | null;
}

export interface Exif {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}

export interface Location {
  name: string | null;
  city: string | null;
  country: string | null;
  position: Position;
}

export interface Position {
  latitude: number | null;
  longitude: number | null;
}

export interface Meta {
  index: boolean;
}

export interface Tag {
  type: string;
  title: string;
  source: TagSource;
}

export interface TagSource {
  ancestry: Ancestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: CoverPhoto;
}

export interface Ancestry {
  type: AncestryType;
  category?: AncestryCategory;
  subcategory?: AncestrySubcategory;
}

export interface AncestryType {
  slug: string;
  pretty_slug: string;
}

export interface AncestryCategory {
  slug: string;
  pretty_slug: string;
}

export interface AncestrySubcategory {
  slug: string;
  pretty_slug: string;
}

export interface CoverPhoto {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  breadcrumbs: Breadcrumb[];
  urls: Urls;
  links: PhotoLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any | null;
  topic_submissions: any;
  premium: boolean;
  plus: boolean;
  user: User;
}

export interface Breadcrumb {
  slug: string;
  title: string;
  index: number;
  type: string;
}

export interface TagPreview extends Tag {}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  visibility: string;
}
