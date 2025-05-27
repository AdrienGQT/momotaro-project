import type { Manager } from "./Manager";
import { ParallaxManager } from "./ParallaxManager";
import { gsap } from "gsap";

export class StoryManager {
  index: number = 1;
  previousButton: HTMLElement;
  nextButton: HTMLElement;
  transitionScreen: HTMLElement;
  transition: GSAPTimeline | null = null;
  scenes: NodeListOf<HTMLElement>;
  manager: Manager;
  parallaxManager: ParallaxManager | null = null;
  constructor(manager: Manager) {
    console.log("StoryManager Initialized");

    this.manager = manager;

    this.previousButton = document.querySelector(".previous") as HTMLElement;
    this.nextButton = document.querySelector(".next") as HTMLElement;

    this.transitionScreen = document.querySelector(
      ".transitionScreen"
    ) as HTMLElement;

    this.scenes = document.querySelectorAll(".scene");

    this.setListeners();

    this.createTransition();

    this.refreshScene();
  }

  setListeners = () => {
    this.nextButton.addEventListener("click", this.handleNext);
    this.previousButton.addEventListener("click", this.handlePrevious);
  };

  createTransition = () => {
    this.transition = gsap.timeline();
    this.transition.to(this.transitionScreen, {
      opacity: 1,
      duration: 1,
      onComplete: this.refreshScene,
    });
    this.transition.to(this.transitionScreen, {
      opacity: 0,
      duration: 2,
      delay: 0.6,
    });
  };

  handleNext = () => {
    console.log("next");
    this.index++;
    this.triggerSceneChange();
  };

  handlePrevious = () => {
    console.log("previous");
    this.index--;
    this.triggerSceneChange();
  };

  triggerSceneChange = () => {
    this.transition?.play(0);
  };

  refreshScene = () => {
    console.log("refresh scene");
    this.destroyParallax();
    this.scenes.forEach((scene, index) => {
      if (index === this.index) {
        scene.style.display = "block";
        this.parallaxManager = new ParallaxManager(this.manager.sizes, scene);
      } else {
        scene.style.display = "none";
      }
    });
  };

  destroyParallax = () => {
    this.parallaxManager?.destroy();
  };
}
