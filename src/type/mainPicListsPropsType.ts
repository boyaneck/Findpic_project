import { PicList } from './picListsType';

export interface MainPicListsProps {
  searchedPictures: PicList[];
  setSearchedPictures: React.Dispatch<React.SetStateAction<PicList[]>>;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}
