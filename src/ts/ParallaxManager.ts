import { gsap } from "gsap";

export class ParallaxManager {
  scene: HTMLElement;
  elementsToUpdate: NodeListOf<HTMLImageElement>;
  private sizes: { width?: number; height?: number };
  
  constructor(sizes: { width?: number; height?: number }, scene: HTMLElement) {
    console.log("ParallaxManager Initialized");
    
    this.scene = scene;
    this.elementsToUpdate = this.scene.querySelectorAll(".sceneItem");
    this.sizes = sizes;
    
    // Can use the method directly since it's an arrow function (bound to this)
    window.addEventListener("mousemove", this.handleMouseMove);
  }
  
  handleMouseMove = (e: MouseEvent) => {
    this.elementsToUpdate.forEach((element) => {
      const strength: number = Number(element.dataset.perspective) + 1;
      gsap.to(element, {
        x: ((e.clientX - (this.sizes.width! / 2)) / 1000) * -strength,
        y: ((e.clientY - (this.sizes.height! / 2)) / 1000) * -strength,
      });
    });
  };
  
  destroy = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }
}
