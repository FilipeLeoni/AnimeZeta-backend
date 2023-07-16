export class AnimeAlredyAdded extends Error {
  constructor() {
    super('Anime already added.');
  }
}
