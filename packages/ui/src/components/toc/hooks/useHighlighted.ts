import { useEffect, useRef } from "react";

function useHighlighted() {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3, h4");
    const tocItems = document.querySelectorAll(".toc ul li a");
    const headingsArray = Array.from(headings);
    const tocItemsArray = Array.from(tocItems);

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        const currentTargetId = headingsArray.indexOf(entry.target);
        const currentElement = document.querySelector(".is-active");
        if (entry.isIntersecting) {
          if (currentElement !== null) {
            currentElement.classList.remove("is-active");
          }
          tocItemsArray[currentTargetId]?.classList.add("is-active");
        }
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: null, //ブラウザ画面をroot要素に
      rootMargin: "0% 0px -90% 0px",
      threshold: 0, //ターゲット要素が1pxでも交差したとき
    });

    for (const heading of headings) {
      observer.current.observe(heading);
    }
    return () => observer.current?.disconnect();
  }, []);
}

export default useHighlighted;
