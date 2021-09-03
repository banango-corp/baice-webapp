import { Post } from "./post.model";

export class User {
  private username: string;
  private followerCount: number;
  private followingCount: number;
  public posts: Post[] = [];

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

  public follow(): void {
    this.followerCount++;
  }

  public unfollow(): void {
    if (this.followerCount > 0) {
      this.followerCount--;
    }
  }

  public deletePost(id: number): boolean {
    let postIndex = this.posts.findIndex(post => post.getId() === id);
    if (postIndex != -1) {
      this.posts.splice(postIndex, 1);
      return true;
    }
    return false;
  }

}
