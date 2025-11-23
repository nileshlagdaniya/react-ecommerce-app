import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

import React from "react";

const AuthCard: React.FC<AuthCardProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <Card className="w-full max-w-md border bg-card text-card-foreground shadow-md">
        <CardHeader className="text-center space-y-2 pt-8 pb-4">
          <CardTitle className="text-3xl font-bold">{title}</CardTitle>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </CardHeader>

        <CardContent className="px-8 pb-8">{children}</CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;
