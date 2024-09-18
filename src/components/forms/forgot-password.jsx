'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PhoneIcon,
  MailIcon,
  EyeOffIcon,
  EyeIcon
} from "lucide-react";
import Link from 'next/link'

// Sample country data (you would typically have a more extensive list)
const countries = [
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  // Add more countries as needed
];

export default function ForgotPasswordForm() {
  const [step, setStep] = useState(1)
  const [loginMethod, setLoginMethod] = useState("email");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format the number based on length
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
        6,
        10
      )}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
  };

  const handleSubmitContact = (e) => {
    e.preventDefault()
    // Here you would typically send the OTP to the user's email or phone
    // For this example, we'll just move to the next step
    setStep(2)
  }

  const handleSubmitOTP = (e) => {
    e.preventDefault()
    // Here you would typically verify the OTP
    // For this example, we'll just log a message
    console.log('OTP submitted')
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            {step === 1 && "Enter your email or phone number" } 
            {step === 2 && "Enter the OTP sent to your contact"}
            {step === 3 && "Create new password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleSubmitContact}>
              <Tabs value={loginMethod} onValueChange={setLoginMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="phone">Phone</TabsTrigger>
                  </TabsList>
                  <TabsContent value="email">
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                        />
                        <MailIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="phone">
                    <div className="space-y-1">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Select
                          value={selectedCountry.code}
                          onValueChange={(value) =>
                            setSelectedCountry(
                              countries.find((c) => c.code === value) ||
                                countries[0]
                            )
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <span className="font-medium">
                                  {country.dialCode}
                                </span>
                                <span className="ml-2 text-muted-foreground">
                                  {country.name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="relative w-full pr-2">
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="123 456 7890"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            className="flex-1 ml-2"
                          />
                          <PhoneIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              <Button type="submit" className="w-full mt-4 bg-[#B88D6F] hover:bg-[#8C6245]">Send OTP</Button>
            </form>
          ) } 
          { step === 2 && (
            <form onSubmit={handleSubmitOTP}>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup className="flex justify-between w-full">
                      <InputOTPSlot index={0} className="border-[1px]"/>
                      <InputOTPSlot index={1} className="border-[1px]"/>
                      <InputOTPSlot index={2} className="border-[1px]"/>
                      <InputOTPSlot index={3} className="border-[1px]"/>
                      <InputOTPSlot index={4} className="border-[1px]"/>
                      <InputOTPSlot index={5} className="border-[1px]"/>
                    </InputOTPGroup>
                  </InputOTP>
              </div>
              <div className='flex justify-between items-center mt-4 h-fit gap-2'>
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full h-fit">
                  Return
                </Button>
                <Button type="submit" className="w-full h-fit bg-[#B88D6F] hover:bg-[#8C6245]" onClick={() => setStep(3)}>Verify OTP</Button>
              </div>
            </form>
          )}
          { step === 3 && (
                <form>
                    {/* Password */}
                    <div className="space-y-2 my-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative w-full">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 my-2">
                      <Label htmlFor="password">Confirm Password</Label>
                      <div className="relative w-full">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    {/* <div className="space-y-2">
                      <ReCAPTCHA />
                    </div> */}
                  <Button className="w-full bg-[#B88D6F] hover:bg-[#8C6245]">Change Password</Button>
                </form>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="link" className="w-full">
            <Link href={'/login'}>{step === 1 && "Return to Login"}</Link>
            {step === 2 && "Resend OTP"}
            {step === 3 && "Back to Step 1" }
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}