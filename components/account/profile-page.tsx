"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EditProfileModal } from "@/components/account/edit-profile-modal";

export function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-4 lg:py-7">
      <div className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
        <p className="mb-2 text-xs font-semibold tracking-[.16em] text-primary">YOUR SPACE / PROFILE</p><h1 className="mb-2 font-serif text-3xl">
          Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <Card className="glass-panel rounded-[1.75rem] bg-transparent">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary/15 text-2xl text-primary">
                {user.name.firstname[0]}
                {user.name.lastname[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {user.name.firstname} {user.name.lastname}
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 [&>div]:rounded-xl [&>div]:border [&>div]:border-border/50 [&>div]:bg-background/40 [&>div]:p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium">First Name</label>
              </div>
              <p className="mt-1 text-sm">
                {user.name.firstname}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium">Last Name</label>
              </div>
              <p className="mt-1 text-sm">
                {user.name.lastname}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium">Email</label>
              </div>
              <p className="mt-1 text-sm">{user.email}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium">Username</label>
              </div>
              <p className="mt-1 text-sm">{user.username}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium">Phone</label>
              </div>
              <p className="mt-1 text-sm">
                {user.phone || "Not provided"}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium">Address</label>
              </div>
              <p className="mt-1 text-sm">
                {user.address
                  ? `${user.address.street}, ${user.address.city}`
                  : "Not provided"}
              </p>
            </div>
          </div>
          <div className="pt-4">
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="hover:scale-105 transition-transform"
            >
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
