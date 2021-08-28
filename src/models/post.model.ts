export class Post {
  private likesCount: number = 0;
  private dislikesCount: number = 0;
  private playCount: number = 0;

  public getLikesCount(): number {
    return this.likesCount;
  }

  public getDislikesCount(): number {
    return this.dislikesCount;
  }

  public getPlayCount(): number {
    return this.playCount;
  }

  public like() {
    this.likesCount++;
  }

  public dislike() {
    this.dislikesCount++;
  }

  public play() {
    this.playCount++;
  }

}
