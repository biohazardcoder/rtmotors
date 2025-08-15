import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, User } from "lucide-react";

export const Sidebar = () => {
  const { pathname } = useLocation();

  const sidebarItems = [
    {
      title: "Home",
      icon: Home,
      url: "/",
    },
    {
      title: "Dashboard",
      icon: User,
      url: "",
      children: [
        {
          title: "User Management",
          icon: User,
          url: "/dashboard/users",
        },
        {
          title: "Settings",
          icon: User,
          url: "/dashboard/settings",
        },
      ],
    },
  ];

  return (
    <div className="bg-secondary rounded-sm col-span-3 row-span-12 p-4">
      {/* Profile */}
      <HoverCard>
        <HoverCardTrigger>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-accent-foreground">Husanbek Zayniddinov</h1>
              <p className="text-sm text-muted-foreground">
                buxorojahon@gmail.com
              </p>
            </div>
            {pathname !== "/dashboard" && (
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            )}
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="text-muted-foreground text-xs">
            Joined December 2021
          </div>
        </HoverCardContent>
      </HoverCard>

      <Separator className="mt-2" />

      <div className="flex flex-col gap-2 mt-2">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            {item.url ? (
              <Link to={item.url}
                  className="w-full flex items-center justify-start gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
              </Link>
            ) : (
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="flex items-center gap-2">
                      <h1 className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </h1>
                    </AccordionTrigger>
                  {item.children?.map((child, childIndex) => (
                    <AccordionContent key={childIndex} >
                      <Link to={child.url}
                          className="w-full flex items-center justify-start gap-2"
                        >
                          <child.icon className="h-4 w-4" />
                          {child.title} 
                      </Link>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
