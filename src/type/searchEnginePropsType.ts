import { sortedBy } from './sortedByType';

export interface SearchEngineProps {
  tag: sortedBy;
  likes: sortedByLike;
  searchByKeyword: (e: React.FormEvent, str: string) => void;
  typeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}
