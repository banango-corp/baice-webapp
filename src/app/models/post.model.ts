export class Post {
  static id: number = 0;
  private id: number;
  private likesCount: number = 0;
  private dislikesCount: number = 0;
  private playCount: number = 0;
  private audioURL: string;

  constructor(audioURL: string) {
    Post.id++;
    this.id = Post.id;
    this.audioURL = audioURL;
  }

  public getLikesCount(): number {
    return this.likesCount;
  }

  public getDislikesCount(): number {
    return this.dislikesCount;
  }

  public getPlayCount(): number {
    return this.playCount;
  }

  public like(): void {
    this.likesCount++;
  }

  public dislike(): void {
    this.dislikesCount++;
  }

  public play(): void {
    this.playCount++;
  }

  public getAudio(): string {
    return this.audioURL;
  }

  public getId(): number {
    return this.id;
  }

}
