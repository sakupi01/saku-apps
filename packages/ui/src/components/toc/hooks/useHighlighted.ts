import { useEffect, useRef } from "react";

function useHighlighted() {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3, h4");
    const tocItems = document.querySelectorAll(".toc ul li a");
    const headingsArray = Array.from(headings);
    const tocItemsArray = Array.from(tocItems);

    const handleObserver: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        const currentTargetId = headingsArray.indexOf(entry.target);
        const currentElement = document.querySelector(".is-active");
        // エントリが交差している場合
        if (entry.isIntersecting) {
          // すでにis-activeクラスが付与されている要素があれば削除
          if (currentElement !== null) {
            currentElement.classList.remove("is-active");
          }
          // 対象の要素にis-activeクラスを付与
          tocItemsArray[currentTargetId]?.classList.add("is-active");
        }
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px -20% 0px",
      threshold: 0,
    });

    for (const heading of headings) {
      observer.current.observe(heading);
    }
    return () => observer.current?.disconnect();
  }, []);
}

export default useHighlighted;
