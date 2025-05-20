import { gsap } from "gsap";

const onLoad = () => {
  console.log("DOM Loaded");

  const frame: HTMLElement = document.querySelector(".frame") as HTMLElement;
  const items: NodeListOf<HTMLElement> = document.querySelectorAll(".item");

  console.log(frame, items);

  window.addEventListener("mousemove", (e: MouseEvent) => {
    console.log(e.clientX);
    items.forEach(element => {
        const strength : number = Number(element.dataset.parallax) + 1
        console.log(strength)
        gsap.to(element, {
            x :( e.clientX / 1000) * strength,
            y :( e.clientY / 1000) * strength
        })
    });
  });
};

window.addEventListener("DOMContentLoaded", onLoad);
