import { gsap } from "gsap";

export class ParallaxManager {
  scene: HTMLElement;
  elementsToUpdate: NodeListOf<HTMLImageElement>;

  constructor(sizes : { width?: number; height?: number }) {
    console.log("ParallaxManager Initialized");

    this.scene = document.querySelector(".scene") as HTMLElement;
    this.elementsToUpdate = this.scene.querySelectorAll(".sceneItem");

    this.createParallax(sizes);
  }

  createParallax = (sizes : { width?: number; height?: number }) => {
    window.addEventListener("mousemove", (e: MouseEvent) => {
      console.log(e.clientX);
      this.elementsToUpdate.forEach((element) => {
        const strength: number = Number(element.dataset.perspective) + 1;
        console.log(strength);
        gsap.to(element, {
          x: ((e.clientX - (sizes.width! / 2)) / 1000) * -strength,
          y: ((e.clientY - (sizes.height!) / 2) / 1000) * -strength,
        });
      });
    });
  };
}
