import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import NavBar from "@/app/navbar";
import { getUserServerSession } from "@/lib/firebase/server-app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

//Homepage and entry point of app
export default async function Home() {
  const { user } = await getUserServerSession();
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section className="bg-accent mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Revolutionize Your Workflow</span>
              <span className="block">with Our SaaS Solution</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your business processes, boost productivity, and drive
              growth with our cutting-edge SaaS platform.
            </p>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Hi There {user?.displayName}
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-3 sm:gap-5">
                <Button asChild>
                  <Link href="/dashboard/orders">Dashboard</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Learn More
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="some-non-existing-location">404</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <h2 className="text-3xl font-extrabold  text-center mb-12">
          React Query data
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Random Card</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>This is a card!</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p>Create your account in minutes</p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Configure</h3>
            <p>Set up your preferences and integrations</p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
            <p>Start using our powerful features</p>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="bg-accent py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Our Pricing Plans
          </h2>
          <p className="mt-4 text-muted-foreground">
            Choose a plan that fits your needs. Simple pricing with no hidden
            fees.
          </p>

          <div className="mt-10 flex flex-col lg:flex-row justify-center gap-8">
            {/* Basic Plan */}
            <div className="bg-card shadow-lg rounded-lg p-8 lg:w-1/3">
              <h3 className="text-xl font-semibold text-foreground">
                Basic Plan
              </h3>
              <p className="mt-4 text-muted-foreground">
                Perfect for small teams or startups.
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li>✔️ 5 Projects</li>
                <li>✔️ 10 Team Members</li>
                <li>✔️ Basic Support</li>
              </ul>
              <button className="mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-hover">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-primary shadow-lg rounded-lg p-8 lg:w-1/3 text-primary-foreground">
              <h3 className="text-xl font-semibold">Pro Plan</h3>
              <p className="mt-4">Best for growing businesses.</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">$59</span>
                <span>/month</span>
              </div>
              <ul className="mt-6 space-y-4">
                <li>✔️ 20 Projects</li>
                <li>✔️ 50 Team Members</li>
                <li>✔️ Priority Support</li>
              </ul>
              <button className="mt-8 bg-primary-foreground text-primary px-6 py-3 rounded-lg hover:bg-secondary">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-card shadow-lg rounded-lg p-8 lg:w-1/3">
              <h3 className="text-xl font-semibold text-foreground">
                Enterprise Plan
              </h3>
              <p className="mt-4 text-muted-foreground">
                For large teams and organizations.
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-foreground">$99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li>✔️ Unlimited Projects</li>
                <li>✔️ Unlimited Team Members</li>
                <li>✔️ 24/7 Support</li>
              </ul>
              <button className="mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-hover">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="bg-accent shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center mb-4">
              <Avatar>
                <AvatarImage
                  className="rounded-full"
                  src="https://i.pravatar.cc/150?img=32"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Jane Doe</h4>
                <p className="">CEO, TechCorp</p>
              </div>
            </div>
            <p className="italic font-semibold">
              &quot;This SaaS solution has transformed our business operations.
              We&apos;ve seen a 30% increase in productivity since implementing
              it.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button variant="default" size="lg">
                Get Started
              </Button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <p className="text-base xl:text-center">
              &copy; 2023 SaasLogo, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
