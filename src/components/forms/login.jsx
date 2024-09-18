"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EyeIcon,
  EyeOffIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import Link from "next/link";

// Placeholder for reCAPTCHA
const ReCAPTCHA = () => (
  <div className="bg-gray-100 border border-gray-300 p-4 rounded-md text-center text-sm text-gray-600">
    reCAPTCHA placeholder
  </div>
);

// Sample country data (you would typically have a more extensive list)
const countries = [
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  // Add more countries as needed
];

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

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

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Welcome back! Please login to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
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
              <div className="space-y-1">
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
                <div className="flex justify-end items-center">
                  <Button variant="link" className="px-0 text-sm">
                    <Link href={"forgot-password"}>
                      Forgot password?
                    </Link>
                  </Button>
                </div>
              </div>
              {/* <div className="space-y-2">
                <ReCAPTCHA />
              </div> */}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Button className="w-full bg-[#B88D6F] hover:bg-[#8C6245]">Sign in</Button>
          <div className="mt-6 w-full">
            <Separator className="my-4" />
            <div className="space-y-2 ">
              <h4 className="text-sm font-medium text-center">
                Or continue with
              </h4>
              <div className="flex justify-around items-center">
                <Button variant="outline" className="w-fit gap-4 hover:bg-[#B69B76] hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mr-2"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                    />
                  </svg>
                  Google
                </Button>
                <Link href={'/login-fast'}>
                  <Button variant="outline" className="w-fit gap-4 hover:bg-[#B69B76] hover:text-white">OTP Method</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <p>Are you new here?</p>
            <Link
              href={"/sign-up"}
              className="text-gray-400 hover:underline hover:text-gray-500 font-semibold"
            >
              Sign up now!
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
