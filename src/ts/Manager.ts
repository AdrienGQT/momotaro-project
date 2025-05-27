import { StoryManager } from "./StoryManager";

export class Manager {
  sizes: { width?: number; height?: number, aspectRatio?: number } = {};
  screen: HTMLElement
  constructor() {
    console.log("Manager Initialized");
    this.screen = document.querySelector('.screen') as HTMLElement
    this.computeSizes();
    this.checkAspectRatio()

    new StoryManager(this)

    window.addEventListener("resize", this.handleResize);
  }

  computeSizes = () => {
    this.sizes.width = window.innerWidth as number;
    this.sizes.height = window.innerHeight as number;
    this.computeAspectRatio(this.sizes.width, this.sizes.height)
  };

  computeAspectRatio = (width: number | undefined, height: number | undefined) => {
    this.sizes.aspectRatio = width! / height! as number;
  };

  handleResize = () => {
    console.log('HGello')
    this.computeSizes();
    this.checkAspectRatio()
    console.log(this.sizes.aspectRatio)
  };

  checkAspectRatio = () => {
    if(this.sizes.aspectRatio! > 1.2 && this.sizes.aspectRatio! < 2.2){
        this.showScreen()
    }else{
        this.hideScreen()
    }
  }

  showScreen = () => {
    console.log(this.screen.style.display)
    this.screen.style.display = "block"
  }

  hideScreen = () => {
    this.screen.style.display = "none"
  }
}
