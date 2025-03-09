// Declare the extension inside a module
export {};
// Extend the Number interface
declare global {
    interface Number {
      cap(max: number): number;
    }
  }
  


Number.prototype.cap = function(this: number, max: number): number {
    return Math.min(this, max);
  }
