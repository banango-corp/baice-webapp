export class User {
  private username: string;
  private followerCount: number;
  private followingCount: number;

  //TODO: Adicionar lista de seguidores
  // private followers: number[]; // Array de IDs?
  // private following: number[]; //Array de IDs?

  constructor(username: string, followerCount: number = 0, followingCount: number = 0) {
    this.username = username;
    this.followerCount = followerCount;
    this.followingCount = followingCount;
  }

  public getUsername(): string {
    return this.username;
  }

  public getFollowerCount(): number {
    return this.followerCount;
  }

  public getFollowingCount(): number {
    return this.followingCount;
  }

  public follow() {
    this.followerCount++;
  }

  public unfollow() {
    if (this.followerCount > 0) {
      this.followerCount--;
    }
  }

}
