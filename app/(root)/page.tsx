import {UserButton} from "@clerk/nextjs";

export default function HomePage() {
  return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="p-4 bg-primary text-primary-foreground">
          <h1 className="text-2xl font-bold">Gestalt</h1>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="bg-card text-card-foreground p-4 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Welcome to Gestalt</h2>
            <p className="mb-4">
              Experience the power of AI in image generation and editing. Create stunning visuals effortlessly.
            </p>
            <div className="mt-6">
                <UserButton/>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 bg-secondary text-secondary-foreground mt-auto">
          <p>&copy; 2024 Gestalt. All rights reserved.</p>
        </footer>
      </div>
  );
}
