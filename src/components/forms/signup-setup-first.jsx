import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function FirstStep() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="space-y-8 max-w-5xl mx-auto p-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Setup Account - Step 1</h2>
          <p className="text-muted-foreground">Please complete these informations before you head in</p>
        </div>
  
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter your last name" required />
            </div>
          </div>
        </div>
  
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Address Information</h3>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="houseNumber">House Number</Label>
              <Input id="houseNumber" placeholder="Enter house number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Select>
                <SelectTrigger id="street">
                  <SelectValue placeholder="Select street" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="street1">Street 1</SelectItem>
                  <SelectItem value="street2">Street 2</SelectItem>
                  <SelectItem value="street3">Street 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ward">Ward</Label>
              <Select>
                <SelectTrigger id="ward">
                  <SelectValue placeholder="Select ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ward1">Ward 1</SelectItem>
                  <SelectItem value="ward2">Ward 2</SelectItem>
                  <SelectItem value="ward3">Ward 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select>
                <SelectTrigger id="district">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="district1">District 1</SelectItem>
                  <SelectItem value="district2">District 2</SelectItem>
                  <SelectItem value="district3">District 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="city1">City 1</SelectItem>
                  <SelectItem value="city2">City 2</SelectItem>
                  <SelectItem value="city3">City 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
  
        <div className="flex justify-between items-center gap-10">
          <Button type="submit" className="w-full">Continue</Button>
          <Button type="submit" variant="outline" className="w-full">Skip for now</Button>
        </div>
      </form>
    </div>
  )
}