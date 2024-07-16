export class Function {
  private width: number;
  private height: number;

  constructor(width: number = 0, height: number = 0) {
    this.width = width;
    this.height = height;
  }

  getYByX(distanceRun: number): number {
    const y = this.width * Math.pow(this.getIntersezioneXNegativo() + distanceRun, 2) + this.height;
    return y > 0 ? y : 0;
  }

  getDistanceX(): number {
    return Math.sqrt(Math.abs(this.height) / Math.abs(this.width)) * 2;
  }

  private getIntersezioneXNegativo(): number {
    return -Math.sqrt(Math.abs(this.height) / Math.abs(this.width));
  }
}
