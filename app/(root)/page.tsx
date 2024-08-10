import SearchComponent from "@/components/shared/SearchComponent";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { SearchCheckIcon, SearchIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="text-center bg-gradient-to-tl from-primary to-secondary text-white py-8">
        <h2 className="">
          Welcome to <span className="text-yellow-400">Quick-Edit</span>
        </h2>
        <h3 className="my-4">
          Experience the power of AI in image generation and editing. Create
          stunning visuals effortlessly.
        </h3>
      </header>

      {/* Main Content */}
      <main className="py-6">
        <div className="bg-card text-card-foreground p-4 rounded-md shadow-lg">
          <SearchComponent />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-secondary text-secondary-foreground mt-auto">
        <p>&copy; 2024 AI Image Editor. All rights reserved.</p>
      </footer>
    </div>
  );
}
