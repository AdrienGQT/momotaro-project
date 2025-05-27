import type { Manager } from "./Manager";
import { ParallaxManager } from "./ParallaxManager";

export class StoryManager {
  index: number = 0;
  previousButton: HTMLElement;
  nextButton: HTMLElement;
  constructor(manager: Manager) {
    console.log("StoryManager Initialized");

    new ParallaxManager(manager.sizes);
    
    this.previousButton = document.querySelector(".previous") as HTMLElement;
    this.nextButton = document.querySelector(".next") as HTMLElement;

    this.setListeners();
  }

  setListeners = () => {
    this.nextButton.addEventListener("click", this.handleNext);
    this.previousButton.addEventListener("click", this.handlePrevious);
  };

  handleNext = () => {
    console.log("next");
  };

  handlePrevious = () => {
    console.log("previous");
  };

}
