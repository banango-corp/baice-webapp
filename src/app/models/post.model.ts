export class Post {
  static id: number = 0;
  private id: number;
  private likesCount: number = 0;
  private dislikesCount: number = 0;
  private playCount: number = 0;
  private audio: HTMLAudioElement;

  constructor(url: string) {
    Post.id++;
    this.id = Post.id;
    this.audio = new Audio(url);
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

  public getAudio(): HTMLAudioElement {
    return this.audio;
  }

  public getId(): number {
    return this.id;
  }

}
