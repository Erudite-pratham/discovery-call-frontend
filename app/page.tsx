"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/shared/navbar";
import { Skeleton } from "@/components/ui/skeleton";
// import { fetchIndustries } from "@/lib/api";
// import { Industry } from "@/types";

const sectorIcons: Record<string, { icon: string; color: string }> = {
  TECHNOLOGY_SOFTWARE: { icon: "💻", color: "bg-purple-500" },
  HEALTHCARE: { icon: "🏥", color: "bg-blue-500" },
  FINANCIAL_SERVICES: { icon: "💰", color: "bg-green-500" },
  MANUFACTURING: { icon: "🏭", color: "bg-orange-500" },
  RETAIL_ECOMMERCE: { icon: "🛍️", color: "bg-pink-500" },
  REAL_ESTATE_CONSTRUCTION: { icon: "🏗️", color: "bg-amber-500" },
  PROFESSIONAL_SERVICES: { icon: "💼", color: "bg-indigo-500" },
  MEDIA_ENTERTAINMENT: { icon: "🎬", color: "bg-red-500" },
  EDUCATION: { icon: "📚", color: "bg-yellow-500" },
  TRANSPORTATION_LOGISTICS: { icon: "🚚", color: "bg-cyan-500" },
  ENERGY_UTILITIES: { icon: "⚡", color: "bg-lime-500" },
  AGRICULTURE_FOOD: { icon: "🌾", color: "bg-emerald-500" },
  OTHER: { icon: "🏢", color: "bg-gray-500" },
  DEFAULT: { icon: "🏢", color: "bg-gray-500" },
};

interface Industry {
  id: string;
  industryCode: string;
  name: string;
}

export default function Dashboard() {
  const router = useRouter();
  // const [industries, setIndustries] = useState<Industry[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      router.push("/");
      return;
    }

    // Fetch industries from API
    async function loadIndustries() {
      setLoading(true);
      // const data = await fetchIndustries();
      // setIndustries(data);
      setLoading(false);
    }

    loadIndustries();
  }, [router]);

  const getSectorStyle = (industryCode: string) => {
    return sectorIcons[industryCode] || sectorIcons.DEFAULT;
  };

  return (
    <div className="min-h-screen from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-x-hidden">
      <Navbar title="Organization Dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h2 className="text-3xl font-bold mb-8">Select an Industry</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="w-16 h-16 rounded-full mb-2" />
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : industries.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No industries found. Please check your API connection.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => {
              const style = getSectorStyle(industry.industryCode);
              return (
                <Link
                  key={industry.id}
                  href={`/sector/${industry.industryCode.toLowerCase()}`}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div
                        className={`${style.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2`}
                      >
                        {style.icon}
                      </div>
                      <CardTitle className="text-xl">{industry.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
