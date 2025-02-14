/* eslint-disable @next/next/no-img-element */
"use client"
import { useUser } from "@/context/UserContext";
import Link from "next/link"
import { redirect } from "next/navigation";

export default function Home() {
  const { user, loading } = useUser();

  if (!user && !loading) redirect("/sign-in");

  if (loading) {
    return <div className="text-center py-20 text-gray-600 font-bold">Loading...</div>;
  }

  return (
    <div>
      <section className="bg-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Just Templates</h1>
          <p className="text-xl mb-8">Discover stunning templates and components for your next web project</p>
          <Link
            href="/templates"
            className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors"
          >
            Explore Templates
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Just Templates?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 text-indigo-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Designs</h3>
              <p className="text-gray-600">Cutting-edge templates that keep you ahead of the curve</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 text-indigo-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable</h3>
              <p className="text-gray-600">Easily adapt our templates to fit your unique brand</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 text-indigo-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Optimized for speed to enhance user experience</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Portfolio", img: "/images/portfolio-template.jpg", link: "/templates/portfolio" },
              { title: "Business", img: "/images/business-template.jpg", link: "/templates/business" },
              { title: "E-Commerce", img: "/images/ecommerce-template.jpg", link: "/templates/ecommerce" },
            ].map((template, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
              >
                <img
                  src={template.img}
                  alt={template.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{template.title}</h3>
                  <Link
                    href={template.link}
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}