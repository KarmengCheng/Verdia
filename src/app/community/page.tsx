"use client";
import React from "react";
import Sidebar from "@/app/components/sidebar";
import { Heart, Share2, MessageCircle, ImagePlus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import Image from "next/image";
import Avatar1 from "@/app/assets/chicken.png";
import Avatar2 from "@/app/assets/panda.png";
import Avatar3 from "@/app/assets/rabbit.png";
import Post1 from "@/app/assets/post1.jpg";
import Post2 from "@/app/assets/post2.webp";
import ChatWidget from "../components/chat";

const Page = () => {
  return (
    <div className="flex bg-[#0A0A0A] text-white">
      <Sidebar />
      <ChatWidget />
      <div className="ml-20 px-5 py-8 items-center justify-center w-full">
        <div className="w-full flex flex-col h-full px-4 justify-center">
          <div className="w-full items-end justify-end flex mb-4">
            <div className="flex flex-row gap-1 p-2 bg-[#2a2a2a] rounded-lg justify-center items-center w-fit">
              <Image alt="Profile" src={Avatar1} height={30} width={30} />
              <div className="text-sm font-bold text-white flex items-center justify-center h-full">
                Peanut
              </div>
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for posts or people"
              className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#13c948]"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Community Feed</h2>

          <div className="bg-[#2a2a2a] p-3 mb-4 rounded-lg">
            <div className="w-full font-bold">Share with the community</div>
            <textarea
              placeholder="What do you want to share?"
              className="w-full px-4 py-2 mt-2 rounded-md bg-[#1a1a1a] text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#13c948] h-40 resize-none"
            ></textarea>
            <div className="flex  flex-row items-center justify-between space-y-0 pb-2 mt-4 px-2">
              <div>
                <ImagePlus />
              </div>
              <div className="text-sm font-bold px-4 py-2 rounded-lg bg-gray-500">
                Publish
              </div>
            </div>
          </div>

          <Card key="1" className="border-none bg-[#2a2a2a] p-1.5 mb-4 w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={Avatar1}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">Peanut</p>
                  <p className="text-xs text-muted-foreground">@peanut20</p>
                </div>
              </div>
              <div className="text-sm font-bold cursor-pointer underline hover:text-[#13c948]">
                Follow +
              </div>
            </CardHeader>

            <CardContent className="pb-2">
              <p className="mt-1 text-sm font-bold">
                Can someone diagnose this poor plant? 😢
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                I think it might be a disease, but I&apos;m not sure which one.
                Any help would be appreciated!
              </p>
              <div className="relative h-64 w-full overflow-hidden rounded-md">
                <Image
                  src={Post1}
                  alt="Post image"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-gray-400 pt-4">
              <div className="flex items-center space-x-1">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">12</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">8</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">3</span>
              </div>
            </CardFooter>
          </Card>

          <Card key="2" className="border-none bg-[#2a2a2a] p-1.5 mb-4 w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={Avatar2}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-xs text-muted-foreground">@janesmith</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="mt-1 text-sm font-bold">
                Can someone diagnose this poor plant? 😢
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                I think it might be a disease, but I&apos;m not sure which one.
                Any help would be appreciated!
              </p>
              <div className="relative h-64 w-full overflow-hidden rounded-md">
                <Image
                  src={Post2}
                  alt="Post image"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center space-x-1">
                <Heart
                  fill="#14c948"
                  className="h-5 w-5 text-muted-foreground text-[#14c948]"
                />
                <span className="text-sm text-muted-foreground font-bold text-[#14c948]">
                  8
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">2</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">5</span>
              </div>
            </CardFooter>
          </Card>

          <Card key="3" className="border-none bg-[#2a2a2a] p-1.5 mb-4 w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={Avatar3}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Sam Lee</p>
                  <p className="text-xs text-muted-foreground">@samlee</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="mt-1 text-sm font-bold">
                My plants are the only ones that listen without judging 🌿
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                100% best roommates.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center space-x-1">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">20</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">16</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground"></span>
              </div>
            </CardFooter>
          </Card>
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
