"use client";
import React from "react";
import Sidebar from "@/app/components/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";

const Page = () => {
  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <Sidebar />
      <div className="ml-20 overflow-y-auto px-2 py-8 items-center justify-center">
        <div className="w-full flex flex-col h-full px-4 justify-center">
          <div className="text-2xl font-bold">Past Diagnoses</div>
          <div className="text-sm mb-4 text-gray-400">9 Records Founds</div>

          <div className="mb-4">
            <div className="text-sm font-bold text-gray-200 mb-2">
              Friday, 4 April 2025
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    id: "P-3045",
                    plant: "Tomato Plant",
                    disease: "Blight",
                    severity: "Mild",
                  },
                  {
                    id: "P-3044",
                    plant: "Rose Bush",
                    disease: "Powdery Mildew",
                    severity: "Moderate",
                  },
                  {
                    id: "P-3043",
                    plant: "Cucumber Plant",
                    disease: "Downy Mildew",
                    severity: "Severe",
                  },
                ].map((scan) => (
                  <Card
                    key={scan.id}
                    className="bg-[#2A2A2A] border-none text-white flex flex-col h-full"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg font-semibold">
                            {scan.plant}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {scan.disease}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Scan ID:</span>
                        <span>{scan.id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Severity:</span>
                        <span>{scan.severity}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm bg-[#14c984] text-white p-2 rounded-lg w-full text-center">
                        View Report
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-bold text-gray-200 mb-2">
              Thursday, 3 April 2025
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    id: "P-3045",
                    plant: "Tomato Plant",
                    disease: "Blight",
                    severity: "Mild",
                  },
                  {
                    id: "P-3044",
                    plant: "Rose Bush",
                    disease: "Powdery Mildew",
                    severity: "Moderate",
                  },
                  {
                    id: "P-3043",
                    plant: "Cucumber Plant",
                    disease: "Downy Mildew",
                    severity: "Severe",
                  },
                ].map((scan) => (
                  <Card
                    key={scan.id}
                    className="bg-[#2A2A2A] border-none text-white flex flex-col h-full"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg font-semibold">
                            {scan.plant}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {scan.disease}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Scan ID:</span>
                        <span>{scan.id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Severity:</span>
                        <span>{scan.severity}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm bg-[#14c984] text-white p-2 rounded-lg w-full text-center">
                        View Report
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-bold text-gray-200 mb-2">
              Tuesday, 1 April 2025
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    id: "P-3045",
                    plant: "Tomato Plant",
                    disease: "Blight",
                    severity: "Mild",
                  },
                  {
                    id: "P-3044",
                    plant: "Rose Bush",
                    disease: "Powdery Mildew",
                    severity: "Moderate",
                  },
                  {
                    id: "P-3043",
                    plant: "Cucumber Plant",
                    disease: "Downy Mildew",
                    severity: "Severe",
                  },
                ].map((scan) => (
                  <Card
                    key={scan.id}
                    className="bg-[#2A2A2A] border-none text-white flex flex-col h-full"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg font-semibold">
                            {scan.plant}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {scan.disease}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Scan ID:</span>
                        <span>{scan.id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Severity:</span>
                        <span>{scan.severity}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm bg-[#14c984] text-white p-2 rounded-lg w-full text-center">
                        View Report
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center">
            <div className="border-t border-gray-500 w-1/2"></div>
            <div className="text-center px-2 text-sm text-gray-500 whitespace-nowrap">
              No more results
            </div>
            <div className="border-t border-gray-500 w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
