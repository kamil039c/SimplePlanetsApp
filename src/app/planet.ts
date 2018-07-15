export class Planet {
  public gravityShort: string;
  public constructor(
    public name: string, public rotationPeriod: string, public orbitalPeriod: string, public diameter: string,
    public climate: string, public gravity: string, public terrain: string, public surfaceWater: string,
    public population: string) {
      if (this.gravity.length > 12) {
        this.gravityShort = this.gravity.substr(0, 12) + '...';
      } else {
        this.gravityShort = this.gravity;
      }
    }
}
