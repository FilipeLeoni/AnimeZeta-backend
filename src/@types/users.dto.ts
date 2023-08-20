export interface UserProfileDTO {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  totalAnimeCount: number;
  animesCompleted: number;
  episodesWatched: number;
}
