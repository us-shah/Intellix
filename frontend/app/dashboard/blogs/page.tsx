"use client";

import { useMemo, useState } from "react";
import { FileText, Plus, Search } from "lucide-react";

import { useBlogs } from "@/hooks/useBlogs";

import BlogCard from "@/components/blog/BlogCard";
import BlogModal from "@/components/blog/BlogModal";
import DeleteBlogDialog from "@/components/blog/DeleteBlogDialog";

export default function BlogsPage() {
  const {
    blogs,
    loading,
    fetchBlogs,
    removeBlog,
  } = useBlogs();

  const [search, setSearch] = useState("");

  const [selectedBlog, setSelectedBlog] =
    useState<any>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog: any) =>
      `${blog.Title} ${blog.Author} ${blog.Status}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [blogs, search]);

  return (
    <main className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Blog Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all company blog posts.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedBlog(null);
            setModalOpen(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          New Blog
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Total Blogs</p>
          <h2 className="text-3xl font-bold">
            {blogs.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Published</p>
          <h2 className="text-3xl font-bold">
            {
              blogs.filter(
                (b: any) =>
                  b.Status === "Published"
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Drafts</p>
          <h2 className="text-3xl font-bold">
            {
              blogs.filter(
                (b: any) =>
                  b.Status === "Draft"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search blogs..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 py-3"
        />

      </div>

      {loading && (
        <div className="text-center py-20">
          Loading...
        </div>
      )}

      {!loading &&
        filteredBlogs.length === 0 && (

          <div className="text-center py-20">

            <FileText
              size={70}
              className="mx-auto text-gray-500"
            />

            <h2 className="text-3xl font-bold mt-6">
              No Blogs Found
            </h2>

          </div>

        )}

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredBlogs.map((blog: any) => (

          <BlogCard
            key={blog.BlogID}
            blog={blog}
            onEdit={(item) => {
              setSelectedBlog(item);
              setModalOpen(true);
            }}
            onDelete={(item) => {
              setSelectedBlog(item);
              setDeleteOpen(true);
            }}
          />

        ))}

      </div>

      <BlogModal
        open={modalOpen}
        blog={selectedBlog}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchBlogs}
      />

      <DeleteBlogDialog
        open={deleteOpen}
        blog={selectedBlog}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeBlog(selectedBlog.BlogID);
          setDeleteOpen(false);
        }}
      />

    </main>
  );
}