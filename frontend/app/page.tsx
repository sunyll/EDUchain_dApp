import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const dapps = [
    {
        title: "Filtering system",
        description: "Filters a mockup .json file of OC credentials based on user input.",
        route: "/filtersystem-dapp"
    },
    {
        title: "Job listings",
        description: "Simple platform with OCID login, allowing users to apply for job listings.",
        route: "/job-listings-dapp"
    },

]

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-teal-50">
            <main className="flex-grow container mx-auto px-4 py-20 my-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dapps.map((dapp, index) => (
                        <Link href={dapp.route} key={index} className="transform transition-transform hover:scale-105">
                            <Card className="h-full border-2 border-teal-200 hover:border-teal-400 bg-white shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-teal-700">{dapp.title}</CardTitle>
                                    <CardDescription className="text-teal-600">{dapp.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}
