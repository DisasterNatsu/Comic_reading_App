interface NavDataType {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (state: boolean) => void;
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
}

interface PopularResults {
  id: string;
  ComicTitle: string;
  CoverImage: string;
}

interface chaptersResponse {
  comicDetails: {
    ComicTitle: string;
    CoverImage: string;
    id: string;
    Artist: string;
    Author: string;
    Description: string;
    Genres: string;
    Status: string;
    Origin: string;
  };
  chapters: ChaptersResponse[];
}

interface ChaptersResponse {
  chapterID: number;
  ChapterNumber: string;
  ChapterName?: string;
  chapterDate: string;
}

type DataResponse = {
  allChapters: chaptersResponse;
} | null;

interface LatestData {
  ComicTitle: string;
  comicID: string;
  CoverImage: string;
  chapters: {
    chapterID: number;
    ChapterNumber: string;
    ChapterName: string;
    chapterDate: string;
  }[];
}

interface pageResponse {
  ChapterNumber: string;
  ChapterName?: string;
  ComicTitle: string;
  pages: string;
  chapterID: number;
}

interface UserLoginResponse {
  UserName: string;
  authToken: string;
  email: string;
}

interface DisqusProps {
  id: string;
  query: string;
  title: string;
}
