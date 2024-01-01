import { InitialPicLists } from './initialPicLists';
import { PicList } from './picListsType';
import { sortedBy } from './sortedByType';

export interface MainPicListsProps {
  searchedPictures: PicList[];
  setSearchedPictures: React.Dispatch<React.SetStateAction<PicList[]>>;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  tag: sortedBy;
  initialPicLists: InitialPicLists;
  data: PicList[] | undefined;
  likes: sortedByLike;
  searchKeyword: string;
  setLikes: React.Dispatch<React.SetStateAction<sortedByLike>>;
}
