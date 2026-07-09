import { useState, useEffect } from "react";
import Container from "../../../components/ui/Container";
import Section from "../../../components/ui/Section";
import Badge from "../../../components/ui/Badge";
import Footer from "../../../components/layout/Footer";
import { getBlogs } from "../../../services/contentApi";
import { getImageUrl } from "../../../utils/imageUrl";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlogs();
        // Show only published ones
        setBlogs(data.filter(a => a.status === "Published"));
      } catch (error) {
        console.error("Failed to load blogs", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <Section className="pt-32 bg-[#F8F6F1] min-h-screen">
        <Container>
          <h1 className="text-6xl font-semibold">Blogs</h1>
          <p className="text-[#6B7280] mt-4 max-w-2xl">
            Career guidance and practical advice for aspiring legal professionals.
          </p>

          {isLoading ? (
            <div className="mt-12 text-[#6B7280]">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="mt-12 text-[#6B7280]">No blogs published yet.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-white border border-[#E5E0D8] p-6 flex flex-col">
                  {blog.image && (
                    <div className="w-full h-48 mb-4 overflow-hidden bg-[#EDE7DC]">
                      <img 
                        src={getImageUrl(blog.image)} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <Badge>{blog.category || "Career"}</Badge>
                    <h3 className="text-2xl font-semibold mt-4 mb-3">{blog.title}</h3>
                    <p className="text-[#6B7280] leading-7 line-clamp-3">
                      {blog.description}
                    </p>
                  </div>
                  <button className="mt-6 text-[#B8871B] font-semibold text-left">
                    Read Blog →
                  </button>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Footer />
    </>
  );
}

export default Blogs;