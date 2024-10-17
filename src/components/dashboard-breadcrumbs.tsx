"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";

export default function DashboardBreadcrumbs() {
  const pathname = usePathname();

  const paths = useMemo(
    () => pathname.split("/").filter((path) => path !== ""),
    [pathname],
  );

  return (
    <Breadcrumb className="hidden md:flex capitalize">
      <BreadcrumbList>
        {paths.map((path, index) => (
          <Fragment key={path}>
            {index === paths.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{path}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/${Array.from(paths)
                        .splice(0, index + 1)
                        .join("/")}`}
                    >
                      {path}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
