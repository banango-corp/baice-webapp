import { Post } from "./post.model";

export class User {
  private username: string;
  private followerCount: number;
  private followingCount: number;
  public posts: Post[] = [];

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

  public follow(): void {
    this.followerCount++;
  }

  public unfollow(): void {
    if (this.followerCount > 0) {
      this.followerCount--;
    }
  }
}
