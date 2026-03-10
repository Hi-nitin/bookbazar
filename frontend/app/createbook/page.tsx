"use client"

import { useState } from "react"
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import getCookie from "@/lib/getcookies"

export default function UploadBook() {
  // text states
  const [bookName, setBookName] = useState("")
  const [price, setPrice] = useState<string>("")
  const [address, setAddress] = useState("")
  const [about, setAbout] = useState("")
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [mainPreview, setMainPreview] = useState<string | null>(null)
  const [extraImages, setExtraImages] = useState<(File | null)[]>([null, null, null])
  const [extraPreviews, setExtraPreviews] = useState<(string | null)[]>([null, null, null])
  const [loading, setLoading] = useState(false)
  const handleMainImage = (file: File) => {
    setMainImage(file)
    setMainPreview(URL.createObjectURL(file))
  }
  const handleExtraImage = (file: File, index: number) => {
    const updatedFiles = [...extraImages]
    updatedFiles[index] = file
    setExtraImages(updatedFiles)

    const updatedPreviews = [...extraPreviews]
    updatedPreviews[index] = URL.createObjectURL(file)
    setExtraPreviews(updatedPreviews)
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", bookName)
    formData.append("price", price)
    formData.append("address", address)
    formData.append("about", about)

    if (mainImage) formData.append("mainImage", mainImage)
    extraImages.forEach((img) => {
      if (img) formData.append("additionalImages", img)
    })


 
    const token =getCookie('token_value');

    if(!token) return;

    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book/createbook`, {
        method: "POST",
        body: formData,
        headers: {
          token: token
        }
      })

      if (!res.ok) {

        const data = await res.json()
        console.log(data)
        alert("error")
      }

      const data = await res.json()
      console.log(data)
      alert("Book uploaded successfully!")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl p-4 sm:p-6"
    >
      <div className="space-y-10 rounded-2xl border p-6 shadow-sm backdrop-blur-sm">


        <div>
          <h2 className="text-lg font-semibold">Upload Book</h2>
          <p className="mt-1 text-sm opacity-70">
            Fill the information about your book
          </p>
        </div>


        <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">


          <div className="sm:col-span-4">
            <label className="block text-sm font-medium">Book Name</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Book title"
              className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>


          <div className="sm:col-span-4">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>


          <div className="sm:col-span-4">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>


          <div className="col-span-full">
            <label className="block text-sm font-medium">About</label>
            <textarea
              rows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write about the book..."
              className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>


          <div className="col-span-full">
            <label className="block text-sm font-medium">Main Book Image</label>
            <label className="mt-2 flex cursor-pointer items-center gap-4 rounded-xl border border-dashed p-4">
              <UserCircleIcon className="h-12 w-12 opacity-40" />
              <div>
                <p className="text-sm font-medium">Upload main image</p>
                {mainPreview && (
                  <img
                    src={mainPreview}
                    alt="Main Preview"
                    className="mt-2 h-24 w-24 rounded-xl object-cover border"
                  />
                )}
              </div>
              <input
                type="file"
                capture
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleMainImage(e.target.files[0])}
              />
            </label>
          </div>


          <div className="col-span-full">
            <label className="block text-sm font-medium">Additional Images</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              {extraImages.map((img, index) => (
                <label
                  key={index}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center"
                >
                  <PhotoIcon className="h-8 w-8 opacity-40" />
                  <p className="mt-2 text-xs font-medium">Upload Image {index + 1}</p>
                  {extraPreviews[index] && (
                    <img
                      src={extraPreviews[index]!}
                      alt={`Preview ${index + 1}`}
                      className="mt-2 h-24 w-24 rounded-xl object-cover border"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    capture
                    onChange={(e) =>
                      e.target.files?.[0] && handleExtraImage(e.target.files[0], index)
                    }
                  />
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            {loading ? "Uploading..." : "Upload Book"}
          </button>
        </div>

      </div>
    </form>
  )
}