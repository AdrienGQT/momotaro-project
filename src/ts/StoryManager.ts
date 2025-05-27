import type { Manager } from "./Manager";
import { ParallaxManager } from "./ParallaxManager";

export class StoryManager {
  index: number = 1;
  previousButton: HTMLElement;
  nextButton: HTMLElement;
  scenes : NodeListOf<HTMLElement>
  manager: Manager
  parallaxManager: ParallaxManager | null
  constructor(manager: Manager) {
    console.log("StoryManager Initialized");

    this.manager = manager

    this.previousButton = document.querySelector(".previous") as HTMLElement;
    this.nextButton = document.querySelector(".next") as HTMLElement;

    this.scenes = document.querySelectorAll('.scene')

    this.parallaxManager = null

    this.setListeners();

    this.displayScene()
  }

  setListeners = () => {
    this.nextButton.addEventListener("click", this.handleNext);
    this.previousButton.addEventListener("click", this.handlePrevious);
  };

  handleNext = () => {
    console.log("next");
    this.index++
    this.displayScene()
  };

  handlePrevious = () => {
    console.log("previous");
    this.index--
    this.displayScene()
  };

  displayScene = () => {
    this.destroyParallax()
    this.scenes.forEach((scene, index) => {
        if(index === this.index){
            scene.style.display = "block"
            this.parallaxManager = new ParallaxManager(this.manager.sizes, scene);

            console.log(scene, "set to block")
        }else{
            // scene.removeEventListener('mousemove', handleMouseMove)
            scene.style.display = "none"
            console.log(scene, "set to none")

        }
    });
  }

  destroyParallax = () => {
    this.parallaxManager?.destroy()
  }

}
