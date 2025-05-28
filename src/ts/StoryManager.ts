import type { Manager } from "./Manager";
import { ParallaxManager } from "./ParallaxManager";
import { gsap } from "gsap";

export class StoryManager {
  index: number = 0;
  previousButton: HTMLElement;
  nextButton: HTMLElement;
  transitionScreen: HTMLElement;
  transition: GSAPTimeline | null = null;
  textTimeline: GSAPTimeline | null = null; // Track text animation timeline
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
      onComplete: () => {
        this.refreshScene();
        this.animateText();
      },
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
    this.killTextAnimation(); // Kill any existing text animation
    
    this.scenes.forEach((scene, index) => {
      if (index === this.index) {
        scene.style.display = "block";
        this.resetSubtitles(scene); // Reset subtitles to initial state
        this.parallaxManager = new ParallaxManager(this.manager.sizes, scene);
      } else {
        scene.style.display = "none";
      }
    });
  };

  // Reset all subtitle elements to their initial state
  resetSubtitles = (scene: HTMLElement) => {
    const sc: HTMLElement = scene.querySelector(".subtitlesContainer") as HTMLElement;
    if (!sc) return;
    
    const lines = Array.from(sc.querySelectorAll(".subtitle"));
    
    // Reset container position
    gsap.set(sc, { y: 0 });
    
    // Reset all subtitle lines to initial state
    gsap.set(lines, { 
      y: 0, 
      opacity: 1 
    });
  };

  killTextAnimation = () => {
    if (this.textTimeline) {
      this.textTimeline.kill();
      this.textTimeline = null;
    }
  };

  animateText = () => {
    const sc: HTMLElement = this.scenes[this.index].querySelector(
      ".subtitlesContainer"
    ) as HTMLElement;
    
    if (!sc) return;
    
    const lines = Array.from(sc.querySelectorAll(".subtitle"));
    
    this.killTextAnimation();

    this.textTimeline = gsap.timeline();
    
    lines.forEach((line, index) => {
      this.textTimeline!.from(line, {
        y: 30,
        opacity: 0,
        delay: 2,
        duration: 0.4,
      });
      
      this.textTimeline!.to(
        sc,
        {
          y: -45 * index,
          duration: 0.4,
        },
        "<"
      );
      
      if (index - 2 >= 0) {
        this.textTimeline!.to(
          lines[index - 2],
          {
            y: -30,
            opacity: 0,
            duration: 0.4,
          },
          "<"
        );
      }
    });
  };

  destroyParallax = () => {
    this.parallaxManager?.destroy();
  };

  destroy = () => {
    this.killTextAnimation();
    this.transition?.kill();
    this.destroyParallax();

    this.nextButton.removeEventListener("click", this.handleNext);
    this.previousButton.removeEventListener("click", this.handlePrevious);
  };
}