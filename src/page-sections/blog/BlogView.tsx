// components/BlogView.js
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Card1 } from "@component/Card1";

const BlogView = () => {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  useEffect(() => {
    const leftColumn = leftColumnRef.current;
    const rightColumn = rightColumnRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rightColumn.style.top = "0";
        } else {
          rightColumn.style.top = `${
            entry.intersectionRect.height - window.innerHeight
          }px`;
        }
      },
      { threshold: 0.5 }
    );

    if (leftColumn) {
      observer.observe(leftColumn);
    }

    return () => {
      if (leftColumn) {
        observer.unobserve(leftColumn);
      }
    };
  }, []);

  return (
    <div className={styles.blogContainer}>
      <div ref={leftColumnRef} className={styles.leftColumn}>
        <h1>Blog Title</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and of
          Lorem Ipsum.
        </p>
      </div>

      <div className={styles.rightColumnContainer} ref={rightColumnRef}>
        <div className={styles.rightColumn}>
          <h2>Latest Blog Posts</h2>
          <Card1>
            <ul>
              <li>Latest Post 1</li>
            </ul>
          </Card1>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
