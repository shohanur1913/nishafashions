import { 
  IconTrendingUp, 
  IconInbox, 
  IconUsers, 
  IconShirt, 
  IconBuildingFactory2 
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface SectionCardsProps {
  stats?: {
    totalEnquiries?: number;
    inquiriesThisMonth?: number;
    monthlyVisitors?: string | number;
    activeProducts?: number;
    monthlyCapacity?: string;
  };
}

export function SectionCards({ stats }: SectionCardsProps) {
  const enquiriesTotal = stats?.totalEnquiries ?? 28;
  const thisMonthEnquiries = stats?.inquiriesThisMonth ?? 14;
  const visitors = stats?.monthlyVisitors ?? "14,820";
  const products = stats?.activeProducts ?? 38;
  const capacity = stats?.monthlyCapacity ?? "8.5M Pcs";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full min-w-0 max-w-full *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* 1. Monthly Buyer Inquiries */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconInbox className="size-4 text-primary" />
            <span>Monthly RFQs &amp; Enquiries</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {enquiriesTotal}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
              <IconTrendingUp className="size-3.5" />
              +18.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-foreground">
            {thisMonthEnquiries} new inquiries this month
          </div>
          <div className="text-muted-foreground text-xs">
            Direct RFQ &amp; Sampling requests
          </div>
        </CardFooter>
      </Card>

      {/* 2. Monthly Buyer Traffic */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconUsers className="size-4 text-primary" />
            <span>Monthly Buyer Traffic</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {visitors}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
              <IconTrendingUp className="size-3.5" />
              +12.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-foreground">
            Trending up this period <IconTrendingUp className="size-4 text-emerald-500" />
          </div>
          <div className="text-muted-foreground text-xs">
            Global buyers from EU, USA &amp; Canada
          </div>
        </CardFooter>
      </Card>

      {/* 3. Active Export Products */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconShirt className="size-4 text-primary" />
            <span>Active Export Styles</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {products}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">
              Verified
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-foreground">
            100% active in catalog
          </div>
          <div className="text-muted-foreground text-xs">
            Knit, Woven, Denim &amp; Sweaters
          </div>
        </CardFooter>
      </Card>

      {/* 4. Production Capacity */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <IconBuildingFactory2 className="size-4 text-primary" />
            <span>Monthly Export Capacity</span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {capacity}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
              <IconTrendingUp className="size-3.5" />
              +8.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-foreground">
            5 manufacturing divisions
          </div>
          <div className="text-muted-foreground text-xs">
            AQL 2.5 audited partner network
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
