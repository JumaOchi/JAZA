import MainLayout from "@/layouts/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">Welcome to Jaza</h1>
        <p className="text-lg text-gray-700">
          Empowering small businesses with financial visibility, savings coaching, and smart credit.
        </p>
      </div>
    </MainLayout>
  );
}
