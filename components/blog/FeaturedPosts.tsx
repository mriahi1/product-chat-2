import React, { useState, useEffect } from "react";
import BlogPost from "@/types/BlogPost";
import { useTranslation } from "@/contexts/TranslationsContext";
import Link from "next/link";

const FeaturedPosts = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      fetchApiData().then((data) => setPosts(data?.posts));
    };

    fetchBlogPosts();
  }, []);

  const fetchApiData = async () => {
    try {
      const response = await fetch(`/api/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("API response: not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching from API:", error);
      return null;
    }
  };

  return (
    <>
      <h2 className="section-header">{t?.("featured_stories")}</h2>
      <div className="featured-posts">
        {posts?.map((post) => (
          <div key={post.Posts_id} className="post">
            <div className="post-details">
              <h2 className="title">{post.title}</h2>

              {post.image_src && (
                <Link href={`/blog/${post.Posts_id}`} className="read-more">
                  <img
                    key={post.Posts_id}
                    src={post.image_src}
                    alt={post.title}
                    className="post-image"
                  />
                </Link>
              )}

              <div className="blog-post-detail__footer mt-2">
                <span className="date">
                  <i>{new Date(post.date).toLocaleDateString()}</i>
                </span>
              </div>

              <div className="mt-2">
                <p className="intro-text">
                  {post.summary.length > 200
                    ? `${post.summary.substring(0, 200)}...`
                    : post.summary}
                </p>
                <Link href={`/blog/${post.Posts_id}`} className="read-more">
                  {t?.("read_more")}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedPosts;
