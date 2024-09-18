import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

// Mock data structure for tags and related tags
const tagData = {
  "Music": ["Rock", "Pop", "Jazz", "Classical", "Hip Hop"],
  "Movies": ["Action", "Comedy", "Drama", "Sci-Fi", "Horror"],
  "Sports": ["Football", "Basketball", "Tennis", "Swimming", "Golf"],
  "Food": ["Italian", "Chinese", "Mexican", "Indian", "Japanese"],
  "Travel": ["Beach", "Mountains", "City", "Countryside", "Historical Sites"]
}

export default function PreferenceForm() {
  const [selectedTags, setSelectedTags] = useState([])
  const [availableTags, setAvailableTags] = useState(Object.keys(tagData))
  const [relatedTags, setRelatedTags] = useState([])

  useEffect(() => {
    const newRelatedTags = selectedTags.flatMap(tag => tagData[tag] || [])
    setRelatedTags([...new Set(newRelatedTags)])
  }, [selectedTags])

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleRelatedTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Selected preferences:", selectedTags)
    // Here you would typically send the data to your backend
  }

  return (
    <div className='flex justify-center items-center h-screen'>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Choose Your Preferences</CardTitle>
            <CardDescription>Select tags to indicate your interests. Choosing a tag will reveal more specific options.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Main Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-[#8C6245] hover:text-white"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {relatedTags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Related Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {relatedTags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-[#91744D] hover:text-white"
                          onClick={() => handleRelatedTagClick(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex justify-center items-center gap-10'>
                <Button type="submit" onClick={handleSubmit} className="w-full bg-[#B88D6F] hover:bg-[#8C6245]">
                  Save Preferences
                </Button>
                <Button type="submit" variant="outline" onClick={handleSubmit} className="w-full">
                  Skip for now
                </Button>
          </CardFooter>
        </Card>
    </div>
  )
}