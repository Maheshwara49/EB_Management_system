import Image from "next/image"

export default function Component() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-green-500 px-6 py-4 text-center">
          <h1 className="text-xl font-bold text-black">Mini Project-12: Electricity Board Connections</h1>
        </div>

        {/* Main Image */}
        <div className="relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BRzNvTiocx3BFGSqP3U1rVg5hxnYwv.png"
            alt="Electronic circuit board with various components and connections"
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />
          {/* Gradient overlay to match the original */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20"></div>
        </div>

        {/* Description */}
        <div className="px-6 py-6 text-center">
          <p className="text-white text-lg font-medium leading-relaxed">
            Full-stack application using React, Python, and SQLite for managing electricity connections.
          </p>
        </div>
      </div>
    </div>
  )
}
