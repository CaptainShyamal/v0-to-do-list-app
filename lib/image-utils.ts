import type React from "react"
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<string | null> => {
  const file = event.target.files?.[0]
  if (!file) return null

  if (!file.type.startsWith("image/")) {
    alert("Please upload an image file")
    return null
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image size should be less than 5MB")
    return null
  }

  try {
    const base64 = await convertImageToBase64(file)
    return base64
  } catch (error) {
    console.error("Error uploading image:", error)
    alert("Failed to upload image")
    return null
  }
}
